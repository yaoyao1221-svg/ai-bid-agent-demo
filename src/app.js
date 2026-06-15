import {
  analyzeBidProject,
  generateProposalDraft,
  getTenderFileSupport,
  reviewProposalDraft
} from './bidEngine.js';
import { sampleEnterprise, sampleTenderText } from './sampleData.js';

const elements = {
  enterpriseName: document.querySelector('#enterpriseName'),
  enterpriseSlogan: document.querySelector('#enterpriseSlogan'),
  enterpriseFacts: document.querySelector('#enterpriseFacts'),
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
  renderEnterprise(sampleEnterprise);
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

  const analysis = analyzeBidProject({ enterprise: sampleEnterprise, tenderText });
  const draft = generateProposalDraft(analysis);
  const review = reviewProposalDraft({ analysis, draft });

  renderFit(analysis.fit, review);
  renderDimensions(analysis.fit.dimensions);
  renderRisks(analysis.risks);
  renderDraft(draft);
  renderReview(review);
  renderReasoning(analysis.reasoningNodes);
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
    const content = await file.text();
    setTenderContent(content, `${file.name}：${support.reason} 请点击“开始解析”。`, true);
  } catch {
    elements.tenderInput.value = '';
    setFileStatus(`${file.name}：文件读取失败，请确认文件编码为 UTF-8 文本。`, false);
  }
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

function renderEnterprise(enterprise) {
  elements.enterpriseName.textContent = enterprise.name;
  elements.enterpriseSlogan.textContent = enterprise.slogan;
  elements.enterpriseFacts.innerHTML = [
    `资质：${enterprise.qualifications.map((item) => item.name).join('、')}`,
    `案例：${enterprise.cases.map((item) => item.name).join('、')}`,
    `能力：${enterprise.capabilities.join('、')}`,
    `售后：${enterprise.service.responseHours}小时响应，本地服务 ${enterprise.service.localOffice ? '已具备' : '待确认'}`
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
      <strong>${escapeHtml(node.name)} · ${(node.confidence * 100).toFixed(0)}%</strong>
      <span>${escapeHtml(node.logicType)} · ${escapeHtml(node.status)}</span>
      <code>${escapeHtml(JSON.stringify(node.output, null, 2))}</code>
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
