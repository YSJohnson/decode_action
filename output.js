//Thu Dec 04 2025 05:14:01 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const config = {
  lotteryCount: 3,
  interval: 1000,
  lotteryData: {
    code: "SCENE-2510301508361",
    provice_name: "河南省",
    city_name: "郑州市",
    area_name: "金水区",
    address: "河南省郑州市金水区花园路100号",
    longitude: "113.665412",
    dimension: "34.757975"
  },
  CARD: process.env.TYBZ_KM || "",
  LINE_URL: parseInt(process.env.TYBZ_LINE || "3", 10),
  commonHeaders: {
    "User-Agent": "Mozilla/5.0 (Linux; Android 14; 22041211AC Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/142.0.7444.158 Mobile Safari/537.36 XWEB/1420037 MMWEBSDK/20250201 MMWEBID/2536 MicroMessenger/8.0.60.2860(0x28003C3F) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
    charset: "utf-8",
    referer: "https://servicewechat.com/wxd79ec05386a78727/101/page-frame.html"
  },
  lotteryApi: "https://sxs-consumer.nfsq.com.cn/geement.marketinglottery/api/v1/marketinglottery",
  pushConfig: {
    pushPlusToken: process.env.PUSHPLUS_TOKEN || ""
  }
};
const request = require("request");
const axios = require("axios");
const qs = require("querystring");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");
const MAX_ACCOUNT_COUNT = (() => {
  const _0x4db534 = config.CARD.slice(0, 4);
  const _0x4459c4 = _0x4db534.match(/^ZH(\d{2})$/);
  if (_0x4459c4) {
    const _0xe800b8 = parseInt(_0x4459c4[1], 10);
    return isNaN(_0xe800b8) ? 5 : Math.max(_0xe800b8, 1);
  }
  return 5;
})();
const globalState = {
  lottery: {
    totalAccounts: 0,
    totalRounds: 0,
    successCount: 0,
    failCount: 0,
    prizeCount: 0,
    accountResults: []
  }
};
async function updateNetworkCount() {
  console.log("\n===== 网络计数器 =====");
  try {
    const _0x599504 = await axios.get("http://hn216.api.yesapi.cn/?s=App.Guest_Counter.SmartRefresh&return_data=0&type=forever&name=JD_HOLIDAY&other_uuid=5f4dcc3b5aa765d61d8327deb882cf99&value=1&app_key=4580F36023BE16625A0511258F421DD4&sign=5B97273F5CE2E2736BC02B60B3426C73", {
      timeout: 10000
    });
    const _0x2c8c8f = _0x599504.data?.["data"]?.["after_value"] || "获取失败";
    console.log("🔥 网络累计运行：" + _0x2c8c8f);
    return _0x2c8c8f;
  } catch (_0x5c1220) {
    console.log("🔥 网络累计运行：获取失败");
    return "获取失败";
  }
}
function printAnnouncement() {
  console.log("\n===== 公告信息 =====");
  console.log("\n🔗 购卡链接：http://w.kami.vip/s/AjeRa1CM   \n💻 青龙脚本：https://pan.quark.cn/s/a40df35868e3\n💬 企鹅群聊：https://qm.qq.com/q/ut7YMmoKYw\n📱 企鹅频道：https://pd.qq.com/s/9ymcqks13\n  ".trim());
  console.log("====================\n");
}
async function printPublicInfo() {
  await updateNetworkCount();
  printAnnouncement();
}
async function updateLocalCount() {
  const _0x21190f = "/ql/data/cardCount.json";
  try {
    let _0x569ebc = {
      total: 0,
      lastRun: ""
    };
    fs.existsSync(_0x21190f) && (_0x569ebc = JSON.parse(fs.readFileSync(_0x21190f, "utf-8")));
    _0x569ebc.total += 1;
    _0x569ebc.lastRun = moment().format("YYYY-MM-DD HH:mm:ss");
    fs.writeFileSync(_0x21190f, JSON.stringify(_0x569ebc, null, 2), "utf-8");
    console.log("\n[🔢 本地统计] 累计执行次数：" + _0x569ebc.total);
    return _0x569ebc.total;
  } catch (_0x54f372) {
    console.log("[⚠️ WARN] 本地计数器更新失败：" + _0x54f372.message);
    return -1;
  }
}
function get32BitUUID() {
  const _0x438bc5 = path.resolve(".jyfsaved.so");
  try {
    if (fs.existsSync(_0x438bc5)) {
      return fs.readFileSync(_0x438bc5, "utf-8").trim();
    }
    const _0x5bc742 = crypto.randomUUID().replace(/-/g, "");
    fs.writeFileSync(_0x438bc5, _0x5bc742, "utf-8");
    console.log("[ℹ️ INFO] 生成UUID：" + _0x5bc742);
    return _0x5bc742;
  } catch (_0x190aa7) {
    console.error("[❌ ERROR] UUID处理失败：" + _0x190aa7.message);
    return null;
  }
}
async function readErrorCodes() {
  try {
    const _0x49a331 = await axios.get("https://gitee.com/wanbian/123/raw/master/note1.json", {
      timeout: 10000
    });
    const _0x11029e = {};
    (_0x49a331.data?.["data"] || []).forEach(_0x31f691 => {
      _0x11029e[_0x31f691.cuowid] = _0x31f691.cuowsm;
    });
    return _0x11029e;
  } catch (_0x1294d6) {
    console.log("[⚠️ WARN] 读取错误码配置失败：" + _0x1294d6.message + "（将使用默认错误提示）");
    return {};
  }
}
async function cardValidation() {
  console.log("==================================================");
  console.log("[🔐 卡密验证] 开始权限校验...");
  console.log("[ℹ️ INFO] 当前卡密：" + (config.CARD ? config.CARD.slice(0, 4) + "****" : "未配置"));
  console.log("[ℹ️ INFO] 选择线路：" + config.LINE_URL + "（1=线路1 2=线路2 3=线路3）");
  console.log("[ℹ️ INFO] 账号上限：" + MAX_ACCOUNT_COUNT + "个");
  console.log("==================================================");
  if (!config.CARD) {
    console.error("[❌ ERROR] 卡密未配置！请通过环境变量TYBZ_KM或硬编码配置");
    return false;
  }
  const _0x121c77 = get32BitUUID();
  if (!_0x121c77) {
    console.error("[❌ ERROR] UUID生成失败，卡密验证无法继续");
    return false;
  }
  console.log("[ℹ️ INFO] 设备标识（UUID）：" + _0x121c77 + "\n");
  const _0xde4719 = await readErrorCodes();
  let _0x1455f0;
  let _0x2b08a4;
  switch (config.LINE_URL) {
    case 2:
      _0x1455f0 = "http://api2.1wxyun.com/?type=17";
      _0x2b08a4 = "http://api2.1wxyun.com/?type=24";
      break;
    case 3:
      _0x1455f0 = "http://apiw1.1wxyun.com/?type=17";
      _0x2b08a4 = "http://apiw1.1wxyun.com/?type=24";
      break;
    default:
      _0x1455f0 = "http://api.1wxyun.com/?type=17";
      _0x2b08a4 = "http://api.1wxyun.com/?type=24";
  }
  let _0x41f85c;
  try {
    const _0xc817a2 = await axios.post(_0x1455f0, qs.stringify({
      Softid: "6V7E8X0I8E9X1H8Z",
      Card: config.CARD,
      Version: "1.0",
      Mac: _0x121c77
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: 10000
    });
    _0x41f85c = String(_0xc817a2.data).trim();
  } catch (_0x461227) {
    console.error("[❌ ERROR] 卡密登录请求失败：" + _0x461227.message);
    return false;
  }
  if (_0xde4719[_0x41f85c]) {
    console.error("[❌ ERROR] 卡密验证失败：" + _0xde4719[_0x41f85c] + "（错误码：" + _0x41f85c + "）");
    return false;
  } else {
    if (_0x41f85c === "-83006") {
      console.error("[❌ ERROR] 卡密验证失败：卡密错误（错误码：-83006）");
      return false;
    } else {
      if (_0x41f85c.length !== 16) {
        console.error("[❌ ERROR] 卡密验证失败：" + _0x41f85c + "（未知错误码）");
        return false;
      }
    }
  }
  console.log("[✅ SUCCESS] 卡密登录成功");
  let _0x12758e;
  try {
    const _0x5bb5f3 = await axios.post(_0x2b08a4, qs.stringify({
      Softid: "6V7E8X0I8E9X1H8Z",
      UserName: config.CARD
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: 10000
    });
    _0x12758e = String(_0x5bb5f3.data).trim();
  } catch (_0x5e1cca) {
    console.error("[❌ ERROR] 查询卡密到期时间失败: " + _0x5e1cca.message);
    return false;
  }
  try {
    const _0x1ed25e = new Date(_0x12758e);
    const _0x549afd = new Date();
    console.log("\n[📅 到期信息] 校验结果");
    console.log("当前时间：" + moment(_0x549afd).format("YYYY-MM-DD HH:mm:ss"));
    console.log("到期时间：" + moment(_0x1ed25e).format("YYYY-MM-DD HH:mm:ss"));
    if (isNaN(_0x1ed25e.getTime())) {
      throw new Error("时间格式错误（接口返回需为：YYYY-MM-DD HH:mm:ss）");
    }
    if (_0x1ed25e < _0x549afd) {
      console.error("[❌ ERROR] 卡密已过期，无法继续执行");
      return false;
    } else {
      const _0x451d96 = Math.floor((_0x1ed25e - _0x549afd) / 3600000);
      console.log("[✅ SUCCESS] 卡密剩余有效期：约" + _0x451d96 + "小时");
    }
  } catch (_0x13c6a2) {
    console.error("[❌ ERROR] 到期时间校验失败：" + _0x13c6a2.message);
    return false;
  }
  await updateLocalCount();
  return true;
}
function getMultiAccountTokens() {
  const _0x53907b = process.env.nfsq_token || "";
  if (!_0x53907b) {
    throw new Error("❌ 未配置青龙环境变量 nfsq_token");
  }
  const _0x51d2f7 = _0x53907b.split("\n").filter(_0x3e5a15 => _0x3e5a15.trim() && _0x3e5a15.includes("#")).map(_0x301f93 => {
    const [_0x5bfcef, _0xfccdd0] = _0x301f93.trim().split("#");
    return {
      unique_identity: _0x5bfcef,
      apitoken: _0xfccdd0
    };
  });
  const _0x54ba45 = _0x51d2f7.slice(0, MAX_ACCOUNT_COUNT);
  _0x54ba45.length < _0x51d2f7.length && console.log("⚠️  账号数量超出限制（当前" + _0x51d2f7.length + "个，上限" + MAX_ACCOUNT_COUNT + "个），已自动截取前" + MAX_ACCOUNT_COUNT + "个");
  if (_0x54ba45.length === 0) {
    throw new Error("❌ 未解析到有效账号（格式：unique_identity#apitoken）");
  }
  return _0x54ba45;
}
function parseAddressConfig() {
  const {
    lotteryData: _0x37b75f
  } = config;
  const _0x4bffc3 = _0x37b75f.provice_name.includes("#") ? 2 : 1;
  const _0xe14851 = [];
  for (let _0x410379 = 0; _0x410379 < _0x4bffc3; _0x410379++) {
    _0xe14851.push({
      code: _0x37b75f.code,
      provice_name: _0x37b75f.provice_name.split("#")[_0x410379] || _0x37b75f.provice_name,
      city_name: _0x37b75f.city_name.split("#")[_0x410379] || _0x37b75f.city_name,
      area_name: _0x37b75f.area_name.split("#")[_0x410379] || _0x37b75f.area_name,
      address: _0x37b75f.address.split("#")[_0x410379] || _0x37b75f.address,
      longitude: parseFloat(_0x37b75f.longitude.split("#")[_0x410379] || _0x37b75f.longitude) || 0,
      dimension: parseFloat(_0x37b75f.dimension.split("#")[_0x410379] || _0x37b75f.dimension) || 0
    });
  }
  return _0xe14851;
}
function bindAccountAddress(_0x36adcf, _0xc03cba) {
  const _0x27da37 = _0xc03cba.length;
  const _0xa7214e = [];
  _0x36adcf.forEach((_0x406265, _0x43f61a) => {
    let _0x1c470b;
    if (_0x27da37 === 1) {
      _0x1c470b = _0xc03cba[0];
    } else {
      _0x27da37 === 2 && (_0x1c470b = _0xc03cba[_0x43f61a % _0x27da37]);
    }
    _0xa7214e.push({
      account: _0x406265,
      address: _0x1c470b,
      accountIndex: _0x43f61a + 1
    });
  });
  return _0xa7214e;
}
function pushPlusNotify(_0x37c098, _0x3aaddc) {
  const _0x259e5c = config.pushConfig.pushPlusToken;
  if (!_0x259e5c) {
    console.warn("⚠️  未配置PushPlus Token，跳过推送");
    return;
  }
  const _0x36af6e = {
    method: "POST",
    url: "http://www.pushplus.plus/send",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: _0x259e5c,
      title: _0x37c098,
      content: _0x3aaddc,
      template: "html"
    })
  };
  request(_0x36af6e, _0x50c557 => {
    if (_0x50c557) {
      console.error("❌ PushPlus批量推送失败：", _0x50c557.message);
    } else {
      console.log("📢 PushPlus批量推送成功");
    }
  });
}
function buildBatchPushContent() {
  let _0x539063 = "\n  <div style=\"font-family:微软雅黑;\">\n    <h3 style=\"color:#2d3748;\">🎯 抽奖+卡密验证批量结果汇总</h3>\n    <p style=\"color:#718096;\">卡密账号上限：" + MAX_ACCOUNT_COUNT + "个</p>\n    <p style=\"color:#718096;\">总账号数：" + globalState.lottery.totalAccounts + " 个</p>\n    <p style=\"color:#718096;\">每个账号执行：" + config.lotteryCount + " 次</p>\n    <p style=\"color:#718096;\">总执行次数：" + globalState.lottery.totalRounds + " 次</p>\n    <p style=\"color:#48bb78;\">成功次数：" + globalState.lottery.successCount + " 次</p>\n    <p style=\"color:#e53e3e;\">失败次数：" + globalState.lottery.failCount + " 次</p>\n    <p style=\"color:#ed8936;\">中奖次数：" + globalState.lottery.prizeCount + " 次</p>\n    <hr style=\"border:1px solid #f0f0f0;\">\n  ";
  globalState.lottery.accountResults.forEach(_0x22bbf4 => {
    _0x539063 += "\n    <div style=\"margin:10px 0;padding:10px;border:1px solid #f5f5f5;border-radius:4px;\">\n      <h4 style=\"color:#2d3748;margin:0 0 8px 0;\">账号" + _0x22bbf4.accountIndex + "（固定地址：" + _0x22bbf4.address.provice_name + "-" + _0x22bbf4.address.city_name + "）</h4>\n    ";
    _0x22bbf4.roundResults.forEach((_0x20f1ff, _0x13417a) => {
      const _0x24cae6 = _0x20f1ff.success ? "#48bb78" : "#e53e3e";
      const _0x42c8fc = _0x20f1ff.success ? "✅ 成功" : "❌ 失败";
      _0x539063 += "\n      <div style=\"margin:4px 0;padding:6px;background:#fafafa;border-radius:2px;\">\n        <p style=\"margin:0;color:#2d3748;\">第" + (_0x13417a + 1) + "次：<span style=\"color:" + _0x24cae6 + ";\">" + _0x42c8fc + "</span></p>\n      ";
      if (_0x20f1ff.success && _0x20f1ff.prizeName !== "未知" && _0x20f1ff.prizeName !== "无") {
        _0x539063 += "\n        <p style=\"margin:2px 0 0 0;color:#718096;font-size:14px;\">\n          奖品：" + _0x20f1ff.prizeName + "（等级：" + _0x20f1ff.prizeLevel + "）<br>\n          时间：" + _0x20f1ff.time + " | 批次ID：" + _0x20f1ff.batchId + "\n        </p>\n        ";
      } else {
        _0x20f1ff.success ? _0x539063 += "<p style=\"margin:2px 0 0 0;color:#718096;font-size:14px;\">未中奖，感谢参与～</p>" : _0x539063 += "<p style=\"margin:2px 0 0 0;color:#718096;font-size:14px;\">原因：" + _0x20f1ff.errMsg + "</p>";
      }
      _0x539063 += "</div>";
    });
    _0x539063 += "</div>";
  });
  _0x539063 += "\n    <hr style=\"border:1px solid #f0f0f0;\">\n    <p style=\"color:#718096;font-size:12px;\">生成时间：" + new Date().toLocaleString() + "</p>\n  </div>\n  ";
  return _0x539063;
}
function sendBatchNotification() {
  const _0x49f1c3 = "【抽奖批量结果】" + globalState.lottery.totalAccounts + "个账号 × " + config.lotteryCount + "次/账号";
  const _0x62419e = buildBatchPushContent();
  console.log("\n" + "=".repeat(60));
  console.log("📢 批量推送通知：" + _0x49f1c3);
  console.log("=".repeat(60) + "\n");
  pushPlusNotify(_0x49f1c3, _0x62419e);
}
function doSingleLottery(_0x405b21, _0x133e5d) {
  const {
    account: _0x4441ec,
    address: _0x45bdeb,
    accountIndex: _0x598e5f
  } = _0x405b21;
  const _0x44f667 = {
    method: "POST",
    url: config.lotteryApi,
    headers: {
      ...config.commonHeaders,
      unique_identity: _0x4441ec.unique_identity,
      apitoken: _0x4441ec.apitoken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(_0x45bdeb)
  };
  request(_0x44f667, function (_0x387219, _0x28179e, _0xf8d94) {
    const _0x1abce5 = "🎡 账号" + _0x598e5f + "（固定地址：" + _0x45bdeb.provice_name + "-" + _0x45bdeb.city_name + "）| 第" + _0x133e5d + "/" + config.lotteryCount + "次";
    console.log("\n" + _0x1abce5 + "抽奖结果：");
    let _0xe4cb5f = globalState.lottery.accountResults.find(_0x1fe061 => _0x1fe061.accountIndex === _0x598e5f);
    !_0xe4cb5f && (_0xe4cb5f = {
      accountIndex: _0x598e5f,
      address: _0x45bdeb,
      roundResults: []
    }, globalState.lottery.accountResults.push(_0xe4cb5f));
    const _0x401d9c = {
      success: false,
      errMsg: "",
      prizeName: "未知",
      prizeLevel: "未知",
      batchId: "无",
      time: new Date().toLocaleString()
    };
    if (_0x387219) {
      const _0x34dfc6 = "请求失败：" + _0x387219.message;
      console.error("❌ " + _0x34dfc6);
      _0x401d9c.errMsg = _0x34dfc6;
      globalState.lottery.failCount++;
    } else {
      try {
        const _0x5c4c61 = JSON.parse(_0xf8d94);
        if (!_0x5c4c61.success || _0x5c4c61.code !== 200) {
          const _0x4a2a06 = "失败原因：" + (_0x5c4c61.msg || "未知错误");
          console.error("❌ " + _0x4a2a06);
          console.log("📋 完整错误返回：", _0x5c4c61);
          _0x401d9c.errMsg = _0x4a2a06;
          globalState.lottery.failCount++;
        } else {
          const {
            prizedto: _0x1be885,
            codeinfo: _0x1c7a78
          } = _0x5c4c61.data;
          _0x401d9c.success = true;
          _0x401d9c.prizeName = _0x1be885?.["prize_name"] || "未知";
          _0x401d9c.prizeLevel = _0x1be885?.["prize_level"] || "未知";
          _0x401d9c.batchId = _0x1be885?.["batch_log_id"] || "无";
          _0x401d9c.time = new Date(_0x5c4c61.ts).toLocaleString() || _0x401d9c.time;
          console.log("🎉 抽奖成功！");
          console.log("====================================");
          console.log("📌 奖品名称：" + _0x401d9c.prizeName);
          console.log("📌 奖品等级：" + _0x401d9c.prizeLevel);
          console.log("📌 抽奖时间：" + _0x401d9c.time);
          console.log("====================================");
          globalState.lottery.successCount++;
          _0x401d9c.prizeName !== "未知" && _0x401d9c.prizeName !== "无" && globalState.lottery.prizeCount++;
        }
      } catch (_0xe2ceb7) {
        const _0x545d52 = "结果解析失败：" + _0xe2ceb7.message;
        console.error("❌ " + _0x545d52);
        console.log("📋 原始返回数据：", _0xf8d94);
        _0x401d9c.errMsg = _0x545d52;
        globalState.lottery.failCount++;
      }
    }
    _0xe4cb5f.roundResults.push(_0x401d9c);
    globalState.lottery.totalRounds++;
    globalState.lottery.totalRounds === globalState.lottery.totalAccounts * config.lotteryCount && setTimeout(() => {
      console.log("\n" + "=".repeat(60));
      console.log("✅ 所有抽奖执行完成！");
      console.log("📊 统计：成功" + globalState.lottery.successCount + "次 | 失败" + globalState.lottery.failCount + "次 | 中奖" + globalState.lottery.prizeCount + "次");
      console.log("=".repeat(60) + "\n");
      sendBatchNotification();
    }, 1000);
  });
}
async function startLotteryLoop() {
  try {
    const _0x497cf4 = getMultiAccountTokens();
    const _0xc5cd5e = parseAddressConfig();
    const _0x5cb0f5 = bindAccountAddress(_0x497cf4, _0xc5cd5e);
    globalState.lottery.totalAccounts = _0x497cf4.length;
    globalState.lottery.totalRounds = 0;
    globalState.lottery.successCount = 0;
    globalState.lottery.failCount = 0;
    globalState.lottery.prizeCount = 0;
    globalState.lottery.accountResults = [];
    console.log("🚀 启动抽奖流程（账号固定地址）");
    console.log("📊 统计信息：" + _0x497cf4.length + "个账号 | " + _0xc5cd5e.length + "个地址 | 每个账号执行" + config.lotteryCount + "次 | 间隔" + config.interval + "ms");
    console.log("====================================");
    _0x5cb0f5.forEach(_0x56ef60 => {
      console.log("📌 账号" + _0x56ef60.accountIndex + " 绑定地址：" + _0x56ef60.address.provice_name + "-" + _0x56ef60.address.city_name + "-" + _0x56ef60.address.area_name);
    });
    console.log("====================================");
    let _0x41e160 = 0;
    _0x5cb0f5.forEach(_0x63a221 => {
      for (let _0x152701 = 1; _0x152701 <= config.lotteryCount; _0x152701++) {
        setTimeout(() => {
          doSingleLottery(_0x63a221, _0x152701);
        }, _0x41e160 * config.interval);
        _0x41e160++;
      }
    });
  } catch (_0x1bb517) {
    console.error("❌ 抽奖初始化失败：" + _0x1bb517.message);
    pushPlusNotify("【抽奖初始化失败】", _0x1bb517.message);
  }
}
async function main() {
  console.log("===== 抽奖+卡密验证系统 开始执行 =====");
  console.log("执行时间：" + moment().format("YYYY-MM-DD HH:mm:ss"));
  let _0x217193 = false;
  try {
    _0x217193 = await cardValidation();
  } catch (_0x4b4cd2) {
    console.error("[❌ 系统异常] " + _0x4b4cd2.message);
  } finally {
    await printPublicInfo();
  }
  _0x217193 ? (console.log("\n[✅ 卡密验证通过] 开始启动抽奖流程..."), await startLotteryLoop()) : console.log("\n[❌ 卡密验证失败] 脚本终止执行");
  console.log("\n===== 抽奖+卡密验证系统 执行结束 =====");
}
main();