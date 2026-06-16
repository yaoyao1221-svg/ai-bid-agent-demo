import assert from 'node:assert/strict';
import test from 'node:test';

import {
  analyzeBidProject,
  extractTenderRequirements,
  generateProposalDraft,
  getTenderFileSupport,
  normalizeEnterpriseProfile,
  reviewProposalDraft
} from '../src/bidEngine.js';

const enterprise = {
  name: '重庆科讯科技有限公司',
  qualifications: [
    { name: '营业执照', level: '企业基础资格', validTo: '2099-12-31' },
    { name: '重庆市社会保险参保证明', level: '社保缴纳证明', validTo: '2099-12-31' }
  ],
  cases: [
    {
      name: '重庆市教育矫治局办公终端采购响应项目',
      industry: '政府采购/办公终端设备',
      amount: 54240,
      year: 2024,
      tags: ['办公终端', '华为擎云C7', 'HarmonyOS', '设备供货', '原厂质保', '政府采购']
    }
  ],
  capabilities: ['办公终端设备供货', '设备参数响应', '政府采购响应文件编制', '原厂质保服务协调'],
  service: {
    localOffice: true,
    responseHours: 24
  }
};

const tenderText = `
项目名称：重庆市某单位办公终端采购项目
投标人资格要求：
1. 投标人须具有有效营业执照。
2. 近三年具有不少于2个类似办公终端供货项目业绩，单项合同金额不低于5万元。
3. 项目团队须具备本地化服务能力，售后响应时间不超过24小时。
评分办法：
商务部分20分，技术部分50分，价格部分30分。
技术方案应包括项目理解、实施方案、质量保障、售后服务方案。
废标条款：
未按要求提供有效资质证书或未响应实质性条款的，按无效投标处理。
`;

test('extractTenderRequirements returns categorized tender requirements', () => {
  const requirements = extractTenderRequirements(tenderText);

  assert.equal(requirements.length, 5);
  assert.equal(requirements[0].type, 'qualification');
  assert.equal(requirements[1].type, 'case');
  assert.equal(requirements[2].type, 'service');
  assert.equal(requirements[3].type, 'technical');
  assert.equal(requirements[4].type, 'risk');
});

test('analyzeBidProject calculates fit score and exposes risks', () => {
  const analysis = analyzeBidProject({ enterprise, tenderText });

  assert.equal(analysis.fit.totalScore, 76);
  assert.equal(analysis.fit.recommendation, '推荐参与');
  assert.equal(analysis.matches[1].status, '部分满足');
  assert.match(analysis.matches[1].reason, /仅找到1个/);
  assert.ok(analysis.reasoningNodes.length >= 6);
  assert.ok(analysis.reasoningNodes.every((node) => node.summary && node.basis && node.conclusion && node.nextAction));
  assert.ok(analysis.risks.some((risk) => risk.level === 'medium'));
});

test('generateProposalDraft uses enterprise facts and flags missing evidence', () => {
  const analysis = analyzeBidProject({ enterprise, tenderText });
  const draft = generateProposalDraft(analysis);

  assert.match(draft.sections.qualificationResponse, /营业执照/);
  assert.match(draft.sections.caseResponse, /重庆市教育矫治局办公终端采购响应项目/);
  assert.match(draft.sections.caseResponse, /需人工补充/);
  assert.match(draft.sections.afterSalesPlan, /24小时/);
});

test('reviewProposalDraft finds missing evidence and produces structured findings', () => {
  const analysis = analyzeBidProject({ enterprise, tenderText });
  const draft = generateProposalDraft(analysis);
  const review = reviewProposalDraft({ analysis, draft });

  assert.ok(review.findings.some((finding) => finding.type === 'missing_evidence'));
  assert.ok(review.findings.some((finding) => finding.type === 'low_score_risk'));
  assert.equal(review.summary.highRiskCount, 0);
  assert.equal(review.summary.mediumRiskCount, 2);
});

test('analyzeBidProject does not recommend bidding when mandatory qualification is missing', () => {
  const weakEnterprise = {
    ...enterprise,
    qualifications: []
  };

  const analysis = analyzeBidProject({ enterprise: weakEnterprise, tenderText });

  assert.equal(analysis.fit.recommendation, '不建议参与');
  assert.ok(analysis.risks.some((risk) => risk.level === 'high' && risk.title.includes('资质')));
});

test('reviewProposalDraft marks missing mandatory facts as high risk', () => {
  const weakEnterprise = {
    ...enterprise,
    qualifications: []
  };
  const analysis = analyzeBidProject({ enterprise: weakEnterprise, tenderText });
  const draft = generateProposalDraft(analysis);
  const review = reviewProposalDraft({ analysis, draft });

  assert.ok(review.findings.some((finding) => finding.type === 'mandatory_gap' && finding.level === 'high'));
  assert.equal(review.summary.highRiskCount, 1);
});

test('getTenderFileSupport accepts text-like and docx tender files and rejects unsupported files in demo', () => {
  assert.deepEqual(getTenderFileSupport('重庆运维项目招标文件.txt'), {
    supported: true,
    reason: '支持文本类招标文件，可直接读取并解析。'
  });
  assert.deepEqual(getTenderFileSupport('投标须知.md'), {
    supported: true,
    reason: '支持文本类招标文件，可直接读取并解析。'
  });
  assert.deepEqual(getTenderFileSupport('招标文件.pdf'), {
    supported: false,
    reason: '当前 demo 不直接解析 PDF，需要后续接入 OCR/文档解析服务。'
  });
  assert.deepEqual(getTenderFileSupport('招标文件.docx'), {
    supported: true,
    reason: '支持 Word .docx 招标文件，将尝试读取文档正文文本。'
  });
});

test('normalizeEnterpriseProfile converts manual enterprise fields into ontology-like data', () => {
  const result = normalizeEnterpriseProfile({
    name: '重庆测试科技有限公司',
    slogan: '本地信息化服务商',
    qualificationsText: '营业执照|企业基础资格|2099-12-31\n重庆市社会保险参保证明|社保缴纳证明|2099-12-31',
    casesText: '重庆市教育矫治局办公终端采购响应项目|政府采购/办公终端设备|54240|2024|办公终端,华为擎云C7,政府采购',
    capabilitiesText: '办公终端设备供货,设备参数响应,政府采购响应文件编制',
    localOffice: true,
    responseHours: '24'
  });

  assert.equal(result.ok, true);
  assert.equal(result.enterprise.name, '重庆测试科技有限公司');
  assert.equal(result.enterprise.qualifications.length, 2);
  assert.equal(result.enterprise.cases[0].amount, 54240);
  assert.equal(result.enterprise.service.responseHours, 24);
});

test('normalizeEnterpriseProfile rejects missing enterprise name and empty qualifications', () => {
  const result = normalizeEnterpriseProfile({
    name: '',
    qualificationsText: '',
    casesText: '',
    capabilitiesText: '',
    localOffice: false,
    responseHours: ''
  });

  assert.equal(result.ok, false);
  assert.ok(result.errors.includes('请填写企业名称。'));
  assert.ok(result.errors.includes('请至少填写一项企业资质。'));
});
