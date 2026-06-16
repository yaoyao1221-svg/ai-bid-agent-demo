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

function renderEnterprise(enterprise) {
  elements.enterpriseName.textContent = enterprise.name;
  elements.enterpriseSlogan.textContent = enterprise.slogan;
  const deviceSummary = (enterprise.devices ?? []).map((item) => `${item.name}（${item.os ?? '系统待补'}，${item.ram ?? '内存待补'}）`).join('、');
  const pendingSummary = (enterprise.pendingEvidence ?? []).slice(0, 4).join('；');
  elements.enterpriseFacts.innerHTML = [
    `资质：${enterprise.qualifications.map((item) => item.name).join('、')}`,
    `案例：${enterprise.cases.map((item) => item.name).join('、')}`,
    `能力：${enterprise.capabilities.join('、')}`,
    `设备：${deviceSummary || '待补充设备信息'}`,
    `证照：${enterprise.businessLicense?.status ?? '待补充营业执照信息'}`,
    `财税：${[...(enterprise.taxProofs ?? []), ...(enterprise.financialStatements ?? [])].map((item) => `${item.name} ${item.status}`).join('；') || '待补充完税和财务信息'}`,
    `售后：${enterprise.service.responseHours}小时响应，本地服务 ${enterprise.service.localOffice ? '已具备' : '待确认'}${enterprise.service.warranty ? `；${enterprise.service.warranty}` : ''}`,
    `待补证据：${pendingSummary || '暂无'}`
  ].map((text) => `<div class="fact">${escapeHtml(text)}</div>`).join('');
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
