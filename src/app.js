import {
  analyzeBidProject,
  generateProposalDraft,
  getTenderFileSupport,
  normalizeEnterpriseProfile,
  reviewProposalDraft
} from './bidEngine.js';
import { kexunEnterprise, sampleTenderText } from './sampleData.js';

const elements = {
  enterpriseName: document.querySelector('#enterpriseName'),
  enterpriseSlogan: document.querySelector('#enterpriseSlogan'),
  enterpriseFacts: document.querySelector('#enterpriseFacts'),
  enterpriseFile: document.querySelector('#enterpriseFile'),
  enterpriseStatus: document.querySelector('#enterpriseStatus'),
  loadKexunSample: document.querySelector('#loadKexunSample'),
  enterpriseNameInput: document.querySelector('#enterpriseNameInput'),
  enterpriseSloganInput: document.querySelector('#enterpriseSloganInput'),
  qualificationsInput: document.querySelector('#qualificationsInput'),
  casesInput: document.querySelector('#casesInput'),
  capabilitiesInput: document.querySelector('#capabilitiesInput'),
  localOfficeInput: document.querySelector('#localOfficeInput'),
  responseHoursInput: document.querySelector('#responseHoursInput'),
  enterpriseRawProfile: kexunEnterprise,
  tenderFile: document.querySelector('#tenderFile'),
  tenderInput: document.querySelector('#tenderInput'),
  runAnalysis: document.querySelector('#runAnalysis'),
  loadSample: document.querySelector('#loadSample'),
  fileStatus: document.querySelector('#fileStatus'),
  fitScore: document.querySelector('#fitScore'),
  fitRecommendation: document.querySelector('#fitRecommendation'),
  riskLevel: document.querySelector('#riskLevel'),
  reviewStatus: document.querySelector('#reviewStatus'),
  reviewCounts: document.querySelector('#reviewCounts'),
  dimensions: document.querySelector('#dimensions'),
  risks: document.querySelector('#risks'),
  draft: document.querySelector('#draft'),
  reviewFindings: document.querySelector('#reviewFindings'),
  reasoningNodes: document.querySelector('#reasoningNodes')
};

function init() {
  fillEnterpriseForm(kexunEnterprise);
  renderEnterprise(kexunEnterprise);
  elements.enterpriseFile.addEventListener('change', handleEnterpriseFileUpload);
  elements.loadKexunSample.addEventListener('click', () => {
    elements.enterpriseFile.value = '';
    fillEnterpriseForm(kexunEnterprise);
    setEnterpriseStatus('已重置为重庆科讯科技有限公司资料。', true);
    renderEnterprise(kexunEnterprise);
  });
  setTenderContent(sampleTenderText, '已加载内置样例招标文件，可点击“开始解析”。', true);
  elements.tenderFile.addEventListener('change', handleTenderFileUpload);
  elements.loadSample.addEventListener('click', () => {
    elements.tenderFile.value = '';
    setTenderContent(sampleTenderText, '已加载内置样例招标文件，可点击“开始解析”。', true);
  });
  elements.runAnalysis.addEventListener('click', runAnalysis);
  runAnalysis();
}

function runAnalysis() {
  const tenderText = elements.tenderInput.value.trim();
  if (!tenderText) {
    setFileStatus('请先上传可解析的招标文件。', false);
    return;
  }

  const normalized = readEnterpriseFromForm();
  if (!normalized.ok) {
    setEnterpriseStatus(normalized.errors.join(' '), false);
    return;
  }

  const enterprise = normalized.enterprise;
  renderEnterprise(enterprise);
  setEnterpriseStatus('企业资料已用于本次解析。', true);

  const analysis = analyzeBidProject({ enterprise, tenderText });
  const draft = generateProposalDraft(analysis);
  const review = reviewProposalDraft({ analysis, draft });

  renderFit(analysis.fit, review);
  renderDimensions(analysis.fit.dimensions);
  renderRisks(analysis.risks);
  renderDraft(draft);
  renderReview(review);
  renderReasoning(analysis.reasoningNodes);
}

async function handleEnterpriseFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.name.toLowerCase().endsWith('.json')) {
    setEnterpriseStatus('当前 demo 仅支持上传 JSON 格式企业资料。', false);
    return;
  }

  try {
    const parsed = JSON.parse(await file.text());
    const enterprise = parsed.enterprise ?? parsed;
    fillEnterpriseForm(enterprise);
    const normalized = readEnterpriseFromForm();
    if (!normalized.ok) {
      setEnterpriseStatus(normalized.errors.join(' '), false);
      return;
    }
    elements.enterpriseRawProfile = enterprise;
    renderEnterprise(normalized.enterprise);
    setEnterpriseStatus(`${file.name}：企业资料已读取，请点击“开始解析”。`, true);
  } catch {
    setEnterpriseStatus(`${file.name}：JSON 解析失败，请检查文件格式。`, false);
  }
}

async function handleTenderFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const support = getTenderFileSupport(file.name);
  if (!support.supported) {
    elements.tenderInput.value = '';
    setFileStatus(`${file.name}：${support.reason}`, false);
    return;
  }

  try {
    const lowerName = file.name.toLowerCase();
    const content = lowerName.endsWith('.docx')
      ? await extractDocxText(file)
      : lowerName.endsWith('.doc')
        ? await extractLegacyDocText(file)
        : await file.text();

    if (!content.trim()) {
      elements.tenderInput.value = '';
      setFileStatus(`${file.name}：没有读取到可解析文本。如果这是扫描版 Word 或加密 Word，需要 OCR 或另存为 .docx 后再解析。`, false);
      return;
    }

    setTenderContent(content, `${file.name}：${support.reason} 请点击“开始解析”。`, true);
  } catch {
    elements.tenderInput.value = '';
    setFileStatus(`${file.name}：文件读取失败，请确认文件格式有效。`, false);
  }
}

async function extractDocxText(file) {
  if (!window.mammoth) {
    throw new Error('mammoth not loaded');
  }

  const arrayBuffer = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({ arrayBuffer });
  return result.value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}

async function extractLegacyDocText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const fullText16 = decodeBytes(bytes, 'utf-16le');
  const fullTextGb = decodeBytes(bytes, 'gb18030');

  const candidate16 = extractChineseBlocks(fullText16);
  const candidateGb = extractChineseBlocks(fullTextGb);

  const best = [candidate16, candidateGb]
    .map(mergeLines)
    .filter((t) => scoreTenderText(t) >= 8)
    .sort((a, b) => scoreTenderText(b) - scoreTenderText(a))[0] ?? '';

  return best;
}

function decodeBytes(bytes, label) {
  try {
    return new TextDecoder(label, { fatal: false }).decode(bytes);
  } catch {
    return '';
  }
}

function scoreTenderText(text) {
  const keywords = ['招标', '比选', '采购', '投标', '响应', '资格', '报价', '供应商', '项目', '文件'];
  const keywordScore = keywords.reduce((s, kw) => s + (text.includes(kw) ? 8 : 0), 0);
  const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) ?? []).length;
  return keywordScore + Math.min(40, Math.floor(chineseCount / 80));
}

function setTenderContent(content, message, isReady) {
  elements.tenderInput.value = content;
  setFileStatus(message, isReady);
}

function setFileStatus(message, isReady) {
  elements.fileStatus.textContent = message;
  elements.fileStatus.classList.toggle('ready', isReady);
  elements.fileStatus.classList.toggle('blocked', !isReady);
}

function setEnterpriseStatus(message, isReady) {
  elements.enterpriseStatus.textContent = message;
  elements.enterpriseStatus.classList.toggle('ready', isReady);
  elements.enterpriseStatus.classList.toggle('blocked', !isReady);
}

function readEnterpriseFromForm() {
  return normalizeEnterpriseProfile({
    name: elements.enterpriseNameInput.value,
    slogan: elements.enterpriseSloganInput.value,
    qualificationsText: elements.qualificationsInput.value,
    casesText: elements.casesInput.value,
    capabilitiesText: elements.capabilitiesInput.value,
    localOffice: elements.localOfficeInput.checked,
    responseHours: elements.responseHoursInput.value,
    originalEnterprise: elements.enterpriseRawProfile
  });
}

function fillEnterpriseForm(enterprise) {
  elements.enterpriseRawProfile = enterprise;
  elements.enterpriseNameInput.value = enterprise.name ?? '';
  elements.enterpriseSloganInput.value = enterprise.slogan ?? '';
  elements.qualificationsInput.value = (enterprise.qualifications ?? [])
    .map((item) => `${item.name}|${item.level}|${item.validTo}`)
    .join('\n');
  elements.casesInput.value = (enterprise.cases ?? [])
    .map((item) => `${item.name}|${item.industry}|${item.amount}|${item.year}|${(item.tags ?? []).join(',')}`)
    .join('\n');
  elements.capabilitiesInput.value = (enterprise.capabilities ?? []).join(',');
  elements.localOfficeInput.checked = Boolean(enterprise.service?.localOffice);
  elements.responseHoursInput.value = enterprise.service?.responseHours ?? '';
}

// ============================================================
// 结构化企业信息展示
// 按类目分组，每条信息标注提取状态与证据来源
// ============================================================

function renderEnterprise(enterprise) {
  elements.enterpriseName.textContent = enterprise.name;
  elements.enterpriseSlogan.textContent = enterprise.slogan;

  const blocks = [];

  // ---- 区块1：基本资质 ----
  const qualItems = (enterprise.qualifications ?? []).map(q => {
    const status = tagStatus(q.evidence);
    return `
      <div class="e-item">
        <span class="e-label">${escapeHtml(q.name)}</span>
        <span class="e-value">${escapeHtml(q.level)}，有效期至 ${escapeHtml(q.validTo)}</span>
        <span class="e-badge ${status.cls}">${status.label}</span>
        ${q.evidence ? `<span class="e-source">来源：${escapeHtml(truncate(q.evidence, 60))}</span>` : ''}
      </div>`;
  }).join('');

  blocks.push(buildBlock('基本资质', qualItems, '营业执照、社保、完税、财务等企业基础资料'));

  // ---- 区块2：营业执照详情 ----
  const bl = enterprise.businessLicense;
  if (bl) {
    const blItems = `
      <div class="e-item">
        <span class="e-label">登记机关</span>
        <span class="e-value">${escapeHtml(bl.registeredAuthority || '未填写')}</span>
        <span class="e-badge confirmed">已确认</span>
      </div>
      <div class="e-item">
        <span class="e-label">注册地址</span>
        <span class="e-value">${escapeHtml(bl.address || '未填写')}</span>
        <span class="e-badge confirmed">已确认</span>
      </div>
      <div class="e-item">
        <span class="e-label">执照状态</span>
        <span class="e-value">${escapeHtml(bl.status || '未填写')}</span>
        <span class="e-badge ocr">需OCR</span>
        ${bl.evidence ? `<span class="e-source">来源：${escapeHtml(truncate(bl.evidence, 60))}</span>` : ''}
      </div>`;
    blocks.push(buildBlock('营业执照', blItems, '统一社会信用代码、注册资本等核心字段需 OCR 补充'));
  }

  // ---- 区块3：项目案例 ----
  const caseItems = (enterprise.cases ?? []).map(c => {
    const status = tagStatus(c.evidence);
    return `
      <div class="e-item">
        <span class="e-label">${escapeHtml(c.name)}</span>
        <span class="e-value">${escapeHtml(c.industry)} · ${c.amount ? formatAmount(c.amount) : '金额待补'} · ${c.year || '年份待补'}</span>
        <span class="e-badge ${status.cls}">${status.label}</span>
        ${c.customer ? `<span class="e-meta">客户：${escapeHtml(c.customer)}</span>` : ''}
        ${c.tags ? `<span class="e-meta">标签：${escapeHtml(c.tags.join('、'))}</span>` : ''}
        ${c.evidence ? `<span class="e-source">来源：${escapeHtml(truncate(c.evidence, 60))}</span>` : ''}
      </div>`;
  }).join('') || '<div class="e-empty">暂无项目案例</div>';

  blocks.push(buildBlock('项目案例', caseItems, '已登记案例用于类似项目业绩匹配'));

  // ---- 区块4：技术设备与能力 ----
  let deviceItems = (enterprise.devices ?? []).map(d => {
    const status = tagStatus(d.evidence);
    return `
      <div class="e-item">
        <span class="e-label">${escapeHtml(d.name)}</span>
        <span class="e-value">${d.os ? escapeHtml(d.os) : ''}${d.ram ? ' · ' + escapeHtml(d.ram) : ''}${d.rom ? ' · ' + escapeHtml(d.rom) : ''}${d.battery ? ' · ' + escapeHtml(d.battery) : ''}</span>
        <span class="e-badge ${status.cls}">${status.label}</span>
        ${d.certifications ? `<span class="e-meta">认证：${escapeHtml(d.certifications.slice(0, 4).join('、'))}${d.certifications.length > 4 ? `等${d.certifications.length}项` : ''}</span>` : ''}
      </div>`;
  }).join('');

  const capItems = (enterprise.capabilities ?? []).map(c => `
    <span class="e-tag">${escapeHtml(c)}</span>
  `).join('');

  const techBlock = `
    ${deviceItems ? `<div class="e-subsection"><p class="e-subtitle">设备</p>${deviceItems}</div>` : ''}
    <div class="e-subsection"><p class="e-subtitle">技术能力</p><div class="e-tag-list">${capItems}</div></div>
    ${(enterprise.productCertifications ?? []).length > 0 ? `
      <div class="e-subsection"><p class="e-subtitle">产品认证（${enterprise.productCertifications.length} 项）</p>
      ${enterprise.productCertifications.map(pc => `
        <div class="e-item">
          <span class="e-label">${escapeHtml(pc.name)}</span>
          <span class="e-value">${escapeHtml(pc.status)}</span>
          <span class="e-badge ocr">需OCR</span>
        </div>
      `).join('')}</div>
    ` : ''}
    <div class="e-subsection"><p class="e-subtitle">售后服务</p>
      <div class="e-item">
        <span class="e-label">本地化服务</span>
        <span class="e-value">${enterprise.service?.localOffice ? '已具备' : '待确认'}</span>
        <span class="e-badge ${enterprise.service?.localOffice ? 'confirmed' : 'pending'}">${enterprise.service?.localOffice ? '已确认' : '待补充'}</span>
      </div>
      <div class="e-item">
        <span class="e-label">响应时效</span>
        <span class="e-value">${enterprise.service?.responseHours || '?'} 小时</span>
        <span class="e-badge ${enterprise.service?.responseHours ? 'confirmed' : 'pending'}">${enterprise.service?.responseHours ? '已确认' : '待补充'}</span>
      </div>
      ${enterprise.service?.warranty ? `
        <div class="e-item">
          <span class="e-label">质保承诺</span>
          <span class="e-value">${escapeHtml(enterprise.service.warranty)}</span>
          <span class="e-badge confirmed">已确认</span>
        </div>` : ''}
      ${enterprise.service?.pricing ? `
        <div class="e-item">
          <span class="e-label">报价说明</span>
          <span class="e-value">${escapeHtml(truncate(enterprise.service.pricing, 80))}</span>
          <span class="e-badge confirmed">已确认</span>
        </div>` : ''}
    </div>`;

  blocks.push(buildBlock('技术设备与能力', techBlock, '设备参数、技术能力、认证及售后服务'));

  // ---- 区块5：财税信息 ----
  const taxItems = (enterprise.taxProofs ?? []).map(t => `
    <div class="e-item">
      <span class="e-label">${escapeHtml(t.name)}</span>
      <span class="e-value">${escapeHtml(t.status)}</span>
      <span class="e-badge ocr">需OCR</span>
      ${t.evidence ? `<span class="e-source">来源：${escapeHtml(truncate(t.evidence, 60))}</span>` : ''}
    </div>
  `).join('');

  const finItems = (enterprise.financialStatements ?? []).map(f => `
    <div class="e-item">
      <span class="e-label">${escapeHtml(f.name)}</span>
      <span class="e-value">${escapeHtml(f.status)}</span>
      <span class="e-badge ocr">需OCR</span>
      ${f.evidence ? `<span class="e-source">来源：${escapeHtml(truncate(f.evidence, 60))}</span>` : ''}
    </div>
  `).join('');

  blocks.push(buildBlock('财税信息', taxItems + finItems, '完税证明和资产负债表需 OCR 提取数值'));

  // ---- 区块6：待补证据清单 + 提取警告 ----
  const pendingItems = (enterprise.pendingEvidence ?? []).map(p => `
    <div class="e-item">
      <span class="e-value">${escapeHtml(p)}</span>
      <span class="e-badge pending">待补充</span>
    </div>
  `).join('') || '<div class="e-empty">暂无待补证据</div>';

  const warnItems = (enterprise.extractionWarnings ?? []).map(w => `
    <div class="e-item e-warning">
      <span class="e-value">${escapeHtml(w)}</span>
    </div>
  `).join('');

  blocks.push(buildBlock('待补充与注意事项', pendingItems + warnItems, '这些信息影响匹配精度，建议优先补充'));

  // ---- 区块7：标书模板（如果有） ----
  const pt = enterprise.proposalTemplates;
  if (pt) {
    const tmplItems = Object.entries(pt).map(([key, val]) => {
      const label = ({ commitment: '基本资格声明', warranty: '质保承诺', pricing: '报价说明', basicQualification: '基本资格声明' })[key] || key;
      return `
        <div class="e-item">
          <span class="e-label">${escapeHtml(label)}</span>
          <span class="e-value">${escapeHtml(truncate(val, 100))}</span>
          <span class="e-badge confirmed">文本已提取</span>
        </div>`;
    }).join('');
    blocks.push(buildBlock('标书模板素材', tmplItems, '可直接用于标书草稿生成'));
  }

  elements.enterpriseFacts.innerHTML = blocks.join('\n');
}

// ---- 辅助函数 ----

function buildBlock(title, items, hint) {
  return `
    <div class="e-block">
      <div class="e-block-head">
        <p class="e-block-title">${escapeHtml(title)}</p>
        ${hint ? `<span class="e-block-hint">${escapeHtml(hint)}</span>` : ''}
      </div>
      <div class="e-block-body">${items}</div>
    </div>`;
}

function tagStatus(evidence) {
  if (!evidence) return { cls: 'pending', label: '待补充' };
  const lower = evidence.toLowerCase();
  if (lower.includes('ocr') || lower.includes('待补充') || lower.includes('需人工')) return { cls: 'ocr', label: '需OCR' };
  if (lower.includes('待确认') || lower.includes('人工确认')) return { cls: 'pending', label: '待确认' };
  return { cls: 'confirmed', label: '已确认' };
}

function formatAmount(amount) {
  if (amount >= 10000) return `${(amount / 10000).toFixed(0)} 万元`;
  return `${amount} 元`;
}

function truncate(str, maxLen) {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}


function renderFit(fit, review) {
  elements.fitScore.textContent = `${fit.totalScore}`;
  elements.fitRecommendation.textContent = fit.recommendation;
  elements.riskLevel.textContent = fit.riskLevel;
  elements.reviewStatus.textContent = review.summary.status;
  elements.reviewCounts.textContent = `高风险 ${review.summary.highRiskCount} 项，中风险 ${review.summary.mediumRiskCount} 项`;
}

function renderDimensions(dimensions) {
  elements.dimensions.innerHTML = dimensions.map((dimension) => `
    <div class="dimension">
      <div class="dimension-top">
        <span>${escapeHtml(dimension.name)}</span>
        <span>${dimension.weightedScore} / ${dimension.weight}</span>
      </div>
      <div class="bar"><span style="width:${dimension.rawScore}%"></span></div>
    </div>
  `).join('');
}

function renderRisks(risks) {
  elements.risks.innerHTML = risks.length
    ? risks.map((risk) => `
      <div class="risk ${risk.level}">
        <strong>${escapeHtml(risk.title)}</strong>
        <p>${escapeHtml(risk.description)}</p>
        <p>${escapeHtml(risk.suggestion)}</p>
      </div>
    `).join('')
    : '<div class="risk"><strong>暂无明显风险</strong><p>仍建议人工复核关键资质、案例和废标条款。</p></div>';
}

function renderDraft(draft) {
  const labels = {
    companyProfile: '公司基本情况',
    qualificationResponse: '资质响应',
    caseResponse: '类似案例',
    technicalPlan: '技术方案',
    implementationPlan: '实施方案',
    afterSalesPlan: '售后方案'
  };

  elements.draft.innerHTML = Object.entries(draft.sections).map(([key, value]) => `
    <section class="draft-section">
      <strong>${labels[key]}</strong>
      <p>${escapeHtml(value)}</p>
    </section>
  `).join('');
}

function renderReview(review) {
  elements.reviewFindings.innerHTML = review.findings.map((finding) => `
    <div class="finding ${finding.level}">
      <strong>${escapeHtml(finding.location)} · ${escapeHtml(finding.type)}</strong>
      <p>${escapeHtml(finding.message)}</p>
      <p>${escapeHtml(finding.suggestion)}</p>
    </div>
  `).join('');
}

function renderReasoning(nodes) {
  elements.reasoningNodes.innerHTML = nodes.map((node) => `
    <div class="node">
      <strong>${escapeHtml(node.summary)}</strong>
      <p>${escapeHtml(node.basis)}</p>
      <p>${escapeHtml(node.conclusion)}</p>
      <p class="next-action">${escapeHtml(node.nextAction)}</p>
      <span>可信度：${(node.confidence * 100).toFixed(0)}%</span>
    </div>
  `).join('');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

init();

function extractChineseBlocks(text) {
  const blocks = [];
  let current = [];
  const chars = String(text).split('');
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const cp = ch.charCodeAt(0);
    const isChinese = cp >= 0x4e00 && cp <= 0x9fff;
    const isAsciiPunct = (cp >= 0x20 && cp <= 0x7e);
    const isCnPunct = '，。、；：？！""''（）【】《》—…·'.includes(ch);
    const isNewline = ch === '\n' || ch === '\r';
    if (isChinese || isAsciiPunct || isCnPunct) {
      current.push(ch);
    } else if (isNewline) {
      if (current.length > 0) {
        blocks.push(current.join('').trim());
        current = [];
      }
    }
  }
  if (current.length > 0) {
    blocks.push(current.join('').trim());
  }
  return blocks.join('\n');
}

function mergeLines(text) {
  return String(text)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => {
      if (line.length < 2) return false;
      const asciiRatio = (line.match(/[\x00-\x7f]/g) ?? []).length / line.length;
      return asciiRatio < 0.8;
    })
    .join('\n');
}
