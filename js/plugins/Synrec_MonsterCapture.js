/*:
 *@author Synrec 
 *@plugindesc 【V5】怪物系统
 *
 *@help
 *-----------------------------------------------------------
 * ▶功能
 *-----------------------------------------------------------
 *
 *
 *
* 魔改作者:流逝的歲月
  * 魔改版本:v1.04
  * 魔改內容:對戰鬥UI介面進行調整,新增立繪顯示功能
  *
  *
  *
  * v1.04:修正了原插件入隊導致崩潰的bug
  * v1.03:修復bug,會導致存檔與讀檔崩潰報錯
  * v1.02:修正立繪顯示的問題
  * v1.01:修復點陣圖崩潰
  *
  *
  * 更改（v5）：
  * -解析度修改。
  * -1 v 1模式在啟用單一敵人時啟用。
  * -錯誤修復了日誌視窗顯示，敵人狀態視窗在期間隱藏。
  *
  * 更改（v4）：
  * -自訂UI可用。
  * -新增了遊戲解析度修改器
  * -修改了Window_BattleStatus的基本程式碼，刪除了儀表區域。
  *
  * 更改（v3）：
  * -關於仍在聯合的演員的大量錯誤修復。
  * -自訂UI的進展，尚未準備好使用。
  *
  * 更改（v2）：
  * -設定演員ID時，敵人演員參數統一。
  * -敵方地圖等級，可設定敵方區域等級。
  * -當你俘虜敵人時，他們會被設定為俘虜等級。
  * 被俘虜敵人的生命值和MP被保留。
  * -創建了一個更用戶友好的UI框架。
  * -幾個Bug修復（例如：敵人攻擊時崩潰）
  * -怪物進化處於概念階段。
  *
  * 貸記到Synrec或twitter帳戶Synrec_Kaisyl。 免費使用
  * 在商業、免費或捐贈項目中。 不要在沒有來源的情況下重新加載。
  *
  * 簡單的即插即用腳本。 透過使用SceneManager推送場景來呼叫場景。
  * 使用notetag:<capture:x>為項目或技能指定捕獲率。 等於或的數字
  * 大於1表示完美捕獲。
  * 使用notetag:<actorId:x>以說明在執行成功捕獲時將哪個演員加入聚會中。
  *
  * 同樣對於敵人，使用標籤<captureHpBonus> 設定獲取多少獎金
  * by reducing Enemy HP. eg:
  * 若敵人剩餘10%的生命值，則俘獲的獎勵為俘獲生命值獎勵的90%。
  * 標籤 <captureMpBonus> 以相同的方式操作。
  * 捕獲僅在用於對付敵方目標時有效。 你甚至可以讓物品捕獲所有敵人。
  *
  * 地圖註解標記：
  * 1) <levelRangeMin:x> Where x = lowest level of enemy on current map.
  * 2) <levelRangeMax:x> Where x = highest level of enemy on current map.
  *
  * 腳本呼叫（非插件呼叫）： 
 * 1)[{To set the reserve box to open}]$gameSystem._reservePartyBox = 1;
 * 2)[{To open the reserve box scene}]SceneManager.push(Scene_MonsterBox);
 *
 *
 *
 *
 *@param Screen Resolution Enable
*@text 螢幕解析度啟用
  *@type boolean
  *@desc 允許更改遊戲解析度。
  *@default true
  *
  *@param Screen Resolution X
  *@text 螢幕解析度X
  *@type number
  *@desc Changes Width of the game window.
  *@default 816
  *
  *@param Screen Resolution Y
  *@text 螢幕解析度Y
  *@type number
  *@desc Changes Height of the game window.
  *@default 624
  *
  *@param Player Character
  *@text 玩家角色
  *@type actor
  *@desc 代表玩家
  *
  *@param Player Non-battler
  *@text 玩家非戰鬥者
  *@type boolean
  *@default true
  *@desc 玩家角色不是戰士。
  *
  *@param Locked Actors
  *@text 鎖定的角色
  *@type actor[]
  *@desc 鎖定的名單。
  *
  *@param Party Limit
  *@text 角色上限
  *@default 4
  *@type number
  *@desc 上限
  *
  *@param Follower Limit
  *@text 追蹤者限制
  *@default 0
  *@type number
  *@desc 追隨者的最大數量。
  *
  *@param Maximum reserve boxes
  *@text 最大保留框
  *@default 30
  *@type number
  *@desc 預留箱的最大數量。
  *
  *@param Maximum actors per box
  *@text 每個盒子的最大角色數
  *@default 30
  *@type number
  *@desc 每個保留箱的最大角色數。
  *
  *@param Name of Team
  *@text 團隊名稱
  *@default Monster Team
  *@type text
  *@desc 名稱
  *
  *@param Single Enemy Team
  *@text 單一敵人團隊
  *@default true
  *@type boolean
  *@desc 一次只有一個敵人作戰。
  *
  *@param Single Enemy Screen X
  *@text 單一敵人螢幕X
  *@default 400
  *@type number
  *@desc 敵人的X位置。
  *
  *@param Single Enemy Screen Y
  *@text 單一敵人螢幕Y
  *@default 400
  *@type number
  *@desc 敵人的Y位置.
  *
  *@param Success Capture Animation
  *@text 成功捕獲動畫
  *@default 46
  *@type animation
  *@desc 成功捕捉時在目標上播放的動畫。
  *
  *@param Failed Capture Animation
  *@text 捕獲動畫失敗
  *@default 47
  *@type animation
  *@desc 捕捉時在目標上播放的動畫。
  *
  *@param Use Custom UI?
  *@text 是否使用自訂UI？
  *@default true
  *@type boolean
  *@desc 將戰鬥UI修改為自訂UI。 [non-func]
  *
  *@param Custom UI Actor MP?
  *@text 自訂UI角色MP？
  *@default false
  *@type boolean
  *@desc Draw Actor MP in custom UI?
  *
  *@param Custom UI Enemy MP?
  *@text 自訂UI怪物MP？
  *@default false
  *@type boolean
  *@desc Draw Enemy MP in custom UI?
  *
  *@param Custom UI Actor TP?
  *@text 自訂UI角色TP？
  *@default false
  *@type boolean
  *@desc Draw Actor TP in custom UI?
  *
  *@param Custom UI Enemy TP?
  *@text 自訂UI怪物TP？
  *@default true
  *@type boolean
  *@desc Draw Enemy TP in custom UI?
  *
  *@param Custom UI Hp Icon
  *@text 自訂UI Hp圖標
  *@default 84
  *@type number
  *@desc Icon index for HP icon.
  *
  *@param Custom UI Mp Icon
  *@text 自訂UI MP圖標
  *@default 72
  *@type number
  *@desc Icon index for MP icon.
  *
  *@param Custom UI Tp Icon
  *@text 自訂UI TP圖標
  *@default 78
  *@type number
  *@desc Icon index for TP icon.
  *
  *@param Custom UI HP Gauge Color 1
  *@text 自訂UI HP儀表顏色1
  *@default #ffffff
  *@desc Color 1 of hp gauge
  *
  *@param Custom UI HP Gauge Color 2
  *@text 自訂UI HP儀表顏色2
  *@default #ff0000
  *@desc Color 2 of hp gauge
  *
  *@param Custom UI 國會議員 Gauge Color 1
  *@text 自訂UI MP儀表顏色1
  *@default #ffffff
  *@desc Color 1 of mp gauge
  *
  *@param Custom UI 國會議員 Gauge Color 2
  *@text 自訂UI MP儀表顏色2
  *@default #0000ff
  *@desc Color 2 of mp gauge
  *
  *@param Custom UI TP Gauge Color 1
  *@text 自訂UI TP儀表顏色1
  *@default #ffffff
  *@desc Color 1 of tp gauge
  *
  *@param Custom UI TP Gauge Color 2
  *@text 自訂UI TP儀表顏色2
 *@default #00ff00
 *@desc Color 2 of tp gauge
 *
 *
 *
 *
 * @param ---文本---
 * @default
 *
 * @param ModifyPartyText
* @text 修改組隊文本
  * @parent ---文本---
  * @type text
  * @desc 修改組隊文字的文字顯示
  * @default Modify Party
  *
  * @param EndText
  * @text 結束文本
  * @parent ---文本---
  * @type text
  * @desc 結束文字的文字顯示
  * @default End
  *
  * @param MonsterBoxText
  * @text 敵人盒子文本
  * @parent ---文本---
  * @type text
  * @desc 敵人盒子文字的文字顯示
  * @default Monster Box:
  *
  *
  * @param ---立繪---
  * @default
  *
  * @param VDrawOfPosX
  * @text 立繪X位置
  * @parent ---立繪---
  * @type number
  * @desc 立繪X偏移的位置
  * @default 96
  *
  * @param VDrawOfPosY
  * @text 立繪Y位置
  * @parent ---立繪---
  * @type number
  * @desc 立繪Y偏移的位置
  * @default 502
  *
  * @param VDrawInfo
  * @text 立繪設定訊息
  * @parent ---立繪---
  * @type struct<VDrawStruct>[]
  * @desc 存放立繪顯示的訊息
 * @default
 *
 *
 *
 *
 */
  /*
 ===============struct=================
 */
 /*~struct~VDrawStruct:
 *
 *
 * @param ---立繪資訊---
  * @default
  *
  *
  * @param ActorId
  * @parent ---立繪資訊---
  * @text 角色
  * @type Actor
  * @desc 填入顯示立繪對應角色的ID值
  * @default
  *
  * @param Ofx
  * @text 立繪X偏移位置
  * @parent ---立繪資訊---
  * @type Text
  * @desc 微調立繪X的偏移位置
  * @default 0
  *
  * @param Ofy
  * @text 立繪Y偏移位置
  * @parent ---立繪資訊---
  * @type Text
  * @desc 微調立繪Y的偏移位置
  * @default 0
  *
  *
  * @param PicWait
  * @parent ---立繪資訊---
  * @text 待機動作立繪
  * @type file
  * @dir img/pictures
  * @desc 角色處於待機狀態時,此立繪將會被切換顯示
  * @default
  *
  * @param PicAttack
  * @parent ---立繪資訊---
  * @text 攻擊動作立繪
  * @type file
  * @dir img/pictures
  * @desc 角色處於攻擊狀態時,此立繪將會被切換顯示
  * @default
  *
  * @param PicInjured
  * @parent ---立繪資訊---
  * @text 受傷動作立繪
  * @type file
  * @dir img/pictures
  * @desc 角色處於受傷狀態時,此立繪將會被切換顯示
  * @default
  *
  *
  * @param PicDeath
  * @parent ---立繪資訊---
  * @text 陣亡動作立繪
  * @type file
  * @dir img/pictures
  * @desc 角色處於陣亡狀態時,此立繪將會被切換顯示
  * @default
 *
 *
 */
 

 
 
 

 var Synrec = Synrec || {};
 Synrec.MC = Synrec.MC || {};
 Synrec.MC.Loaded = true;
 
 Synrec.MC.plugSource = PluginManager.parameters('Synrec_MonsterCapture');
 
 Synrec.MC.resolutionEnable = eval(Synrec.MC.plugSource['Screen Resolution Enable']);
 Synrec.MC.resolutionX = eval(Synrec.MC.plugSource['Screen Resolution X']);
 Synrec.MC.resolutionY = eval(Synrec.MC.plugSource['Screen Resolution Y']);
 
 Synrec.MC.playerActor = eval(Synrec.MC.plugSource['Player Character']);
 Synrec.MC.NonBattlePlayerActor = eval(Synrec.MC.plugSource['Player Non-battler']);;
 Synrec.MC.monsterFollowLimit = eval(Synrec.MC.plugSource['Follower Limit']);
 Synrec.MC.lockedMonsters = eval(Synrec.MC.plugSource['Locked Actors']);
 
 Synrec.MC.teamSize = eval(Synrec.MC.plugSource['Player Character']);
 
 Synrec.MC.maxReserveBoxes = eval(Synrec.MC.plugSource['Maximum reserve boxes']);
 Synrec.MC.maxReserveMembers = eval(Synrec.MC.plugSource['Maximum actors per box']);
 Synrec.MC.partyName = Synrec.MC.plugSource['Name of  Team'];
 Synrec.MC.singleEnemy = Synrec.MC.plugSource['Single Enemy Team'];
 Synrec.MC.singleEnemyScreenX = eval(Synrec.MC.plugSource['Single Enemy Screen X']);
 Synrec.MC.singleEnemyScreenY = eval(Synrec.MC.plugSource['Single Enemy Screen Y']);
 Synrec.MC.SuccessCaptureAnim = eval(Synrec.MC.plugSource['Success Capture Animation']);
 Synrec.MC.FailedCaptureAnim = eval(Synrec.MC.plugSource['Failed Capture Animation']);
 
 var customUI = eval(Synrec.MC.plugSource['Use Custom UI?']);
 Synrec.MC.ActorMpBar = eval(Synrec.MC.plugSource['Custom UI Actor MP?']);
 Synrec.MC.EnemyMpBar = eval(Synrec.MC.plugSource['Custom UI Enemy MP?']);
 Synrec.MC.ActorTpBar = eval(Synrec.MC.plugSource['Custom UI Actor TP?']);
 Synrec.MC.EnemyTpBar = eval(Synrec.MC.plugSource['Custom UI Enemy TP?']);
 Synrec.MC.HpIcon = eval(Synrec.MC.plugSource['Custom UI Hp Icon']);
 Synrec.MC.MpIcon = eval(Synrec.MC.plugSource['Custom UI Mp Icon']);
 Synrec.MC.TpIcon = eval(Synrec.MC.plugSource['Custom UI Tp Icon']);
 Synrec.MC.HpColor1 = Synrec.MC.plugSource['Custom UI HP Gauge Color 1'];
 Synrec.MC.HpColor2 = Synrec.MC.plugSource['Custom UI HP Gauge Color 2'];
 Synrec.MC.MpColor1 = Synrec.MC.plugSource['Custom UI MP Gauge Color 1'];
 Synrec.MC.MpColor2 = Synrec.MC.plugSource['Custom UI MP Gauge Color 2'];
 Synrec.MC.TpColor1 = Synrec.MC.plugSource['Custom UI TP Gauge Color 1'];
 Synrec.MC.TpColor2 = Synrec.MC.plugSource['Custom UI TP Gauge Color 2'];
 
 Synrec.ZzyMC = {};
 
 Synrec.ZzyMC.ModifyPartyText = String(Synrec.MC.plugSource['ModifyPartyText']);
 Synrec.ZzyMC.EndText = String(Synrec.MC.plugSource['EndText']);
 Synrec.ZzyMC.MonsterBoxText = String(Synrec.MC.plugSource['MonsterBoxText']);
 
 Synrec.ZzyMC.VDrawOfPosX = parseInt(Synrec.MC.plugSource['VDrawOfPosX']);
 Synrec.ZzyMC.VDrawOfPosY = parseInt(Synrec.MC.plugSource['VDrawOfPosY']);
 
 Synrec.ZzyMC.VDrawInfo = String(Synrec.MC.plugSource['VDrawInfo']);//获取信息
 
 
 Synrec.ZzyMC.TempBitmap = [];//缓存
 
 //动作ID顺序
 Synrec.ZzyMC.ACTION_WAIT = 1;
 Synrec.ZzyMC.ACTION_ATTACK = 2;
 Synrec.ZzyMC.ACTION_INJURED = 3;
 Synrec.ZzyMC.ACTION_DEATH = 4;
 
 
 Synrec.ZzyMC.DeathSprite = undefined;//死亡中位图
 Synrec.ZzyMC.ShowVDraw = false;//显示立绘判断
 
 Synrec.ZzyMC.BitmapBuff = [];//图片缓存,存储每次战斗的立绘图片
 
 
 
 Synrec.ZzyMC.InitStructData = function()
 {
	 if(Synrec.ZzyMC.VDrawInfo){Synrec.ZzyMC.VDrawInfo = JSON.parse(Synrec.ZzyMC.VDrawInfo);}
	 else return [undefined];
	 
	 var reStructArr = [undefined];//因为0号会被填充
	 
	 var len = Synrec.ZzyMC.VDrawInfo.length;
	 var structArr = Synrec.ZzyMC.VDrawInfo;
	 
	 for(var i=0;i<len;i++)
	 {
		 var structStr = undefined;
		 
		 if(structArr[i]){structStr = JSON.parse(Synrec.ZzyMC.VDrawInfo[i]);}
		 else continue;
		 
		 var info = {};
		 
		 //立绘信息
		 info.ActorId = parseInt(structStr.ActorId);
		 info.Ofx = Number(structStr.Ofx);
		 info.Ofy = Number(structStr.Ofy);
		 
		 //立绘
		 info.PicAttack = String(structStr.PicAttack);
		 info.PicWait = String(structStr.PicWait);
		 info.PicInjured = String(structStr.PicInjured);
		 info.PicDeath = String(structStr.PicDeath);
	 
		 reStructArr.push(info);
	 }
	 
	 return reStructArr;
 }
 Synrec.ZzyMC.VDrawInfoArr = Synrec.ZzyMC.InitStructData();
 
 
 //攻击  待机  受伤  阵亡
 
 if(Synrec.MB){
	 throw new Error('Monster Box and Monster Capture cannot be loaded at the same time.');
 }
 
 var $gameAllActors = null;
 
 synrecDataManagerCreateGameObj = DataManager.createGameObjects;
 DataManager.createGameObjects = function() {
	 synrecDataManagerCreateGameObj.call(this);
	 $gameAllActors = new Game_AllActors();
 }
 if(Synrec.MC.resolutionEnable){
	 SceneManager._screenHeight = Synrec.MC.resolutionY
	 SceneManager._boxHeight = Synrec.MC.resolutionY;
	 SceneManager._screenWidth = Synrec.MC.resolutionX;
	 SceneManager._boxWidth = Synrec.MC.resolutionX;
 }
 
 BattleManager.makeActionOrders = function() {
	 var battlers = [];
	 if (!this._surprise) {
		 battlers = battlers.concat($gameParty.members()[0]);
	 }
	 if (!this._preemptive) {
		 battlers = battlers.concat(this._currentEnemy);
	 }
	 battlers.forEach(function(battler) {
		 battler.makeSpeed();
	 });
	 battlers.sort(function(a, b) {
		 return b.speed() - a.speed();
	 });
	 this._actionBattlers = battlers;
 }
 
 Game_Action.prototype.setSubject = function(subject) {
	 if (subject.isActor()) {
		 this._subjectActorId = $gameParty._actors.indexOf(subject);
		 this._subjectEnemyIndex = -1;
	 } else {
		 this._subjectEnemyIndex = subject.index();
		 this._subjectActorId = -1;
	 }
 };
 
 Game_Action.prototype.subject = function() {
	 if (this._subjectActorId >= 0) {
		 return $gameParty._actors[this._subjectActorId];
	 } else {
		 return $gameTroop.members()[this._subjectEnemyIndex];
	 }
 };
 
 synrecGameActionApply = Game_Action.prototype.apply;
 Game_Action.prototype.apply = function(target) {
	 var item = this.item();
	 if(item.meta.capture && target.isEnemy()){
		 var result = target.result();
		 this.subject().clearResult();
		 result.clear();
		 result.used = this.testApply(target);
		 result.missed = (result.used && Math.random() >= this.itemHit(target));
		 result.evaded = (!result.missed && Math.random() < this.itemEva(target));
		 result.physical = this.isPhysical();
		 result.drain = this.isDrain();
		 if (result.isHit()) {
			 if (this.item().damage.type > 0) {
				 result.critical = (Math.random() < this.itemCri(target));
				 var value = this.makeDamageValue(target, result.critical);
				 this.executeDamage(target, value);
			 }
			 this.item().effects.forEach(function(effect) {
				 this.applyItemEffect(target, effect);
			 }, this);
			 this.applyItemUserEffect(target);
			 var item = this.item();
			 var enemyId = target._enemyId;
			 var enemyData = $dataEnemies[enemyId];
			 var enemyHp = target._hp;
			 var enemyMaxHp = target.param(0);
			 var enemyHpRate = enemyHp / enemyMaxHp;
			 var enemyMp = target._mp;
			 var enemyMaxMp = target.param(1);
			 var enemyHpRate = enemyHp / enemyMaxHp;
			 var enemyMpRate = enemyMp / enemyMaxMp;
			 var captureActor = eval(enemyData.meta.actorId);
			 var captureRate = eval(item.meta.capture);
			 var captureHpBonus = eval(enemyData.meta.captureHpBonus);
			 if(isNaN(captureHpBonus))captureHpBonus = 0;
			 var captureMpBonus = eval(enemyData.meta.captureMpBonus);
			 if(isNaN(captureMpBonus))captureMpBonus = 0;
			 captureHpBonus = captureHpBonus * enemyHpRate;
			 captureMpBonus = captureMpBonus * enemyMpRate;
			 captureRate += captureHpBonus + captureMpBonus;
			 var isCapture = Math.random() < captureRate;
			 if(isCapture && captureActor){
				 if(!$gameSystem._captureId)$gameSystem._captureId = 0;
				 var captureLevel = target._level;
				 var hpSet = target._hp;
				 var mpSet = target._mp;
				 target.startAnimation(Synrec.MC.SuccessCaptureAnim);
				 target.die();
				 target.refresh();
				 $gameParty.addActor(captureActor, captureLevel, hpSet, mpSet);
				 var memIndex = $gameParty._actors.length - 1;
				 $gameSystem._captureId++;
			 }else{
				 target.startAnimation(Synrec.MC.FailedCaptureAnim);
			 }
		 }
	 }else{
		 synrecGameActionApply.call(this, target);
	 }
 }
 
 // Game_Actor.prototype.initSkills = function() {
 //     this._skills = [];
 // 	this._learntSkills = [];
 //     this.currentClass().learnings.forEach(function(learning) {
 //         if (learning.level <= this._level) {
 //             this.learnSkill(learning.skillId);
 //         }
 //     }, this);
 // };
 
 // Game_Actor.prototype.skills = function() {
 //     return this._skills;
 // }
 
 // Game_Actor.prototype.learnSkill = function(skillId) {
 // 	var learntSkill = this.isLearnedSkill(skillId)
 //     if (!learntSkill) {
 // 		var skillData = $dataSkills[skillId];
 // 		if(skillData)this._skills.push(skillData);
 // 		this._learntSkills.push(skillId);
 //     }
 // }
 
 // Game_Actor.prototype.forgetSkill = function(skillId) {
 // 	this._learntSkills.splice(this._learntSkills.indexOf(skillId), 1);
 // 	for(i = 0; i < this._skills.length; i++){
 // 		if(this._skills[i].id == skillId){
 // 			var skill = this._skills[i];
 // 			this._skills.splice(i, 1);
 // 			return skill;
 // 		}
 // 	}
 // }
 
 // Game_Actor.prototype.isLearnedSkill = function(skillId) {
 // 	return this._learntSkills.contains(skillId);
 // }
 
 // Game_Actor.prototype.hasSkill = function(skillId) {
 //     return this._learntSkills.contains(skillId);
 // }
 
 synrecGameEnemyInitMem = Game_Enemy.prototype.initMembers;
 Game_Enemy.prototype.initMembers = function() {
	 synrecGameEnemyInitMem.call(this);
	 this._level = 1;
	 this._classId = 0;
	 this._actorId = 0;
	 this._actorEnemy = false;
 }
 
 synrecGameEnemySetup = Game_Enemy.prototype.setup;
 Game_Enemy.prototype.setup = function(enemyId, x, y) {
	 var enemy = $dataEnemies[enemyId];
	 var mapMeta = $dataMap.meta;
	 this._name = enemy.name;
	 if(enemy.meta.actorId){
		 var actorId = eval(enemy.meta.actorId);
		 var actorData = $dataActors[actorId];
		 if(mapMeta.levelRangeMin){
			 var minLevel = Math.floor(eval(mapMeta.levelRangeMin));
		 }else{
			 var minLevel = 1;
		 }
		 if(mapMeta.levelRangeMax){
			 var maxLevel = Math.floor(eval(mapMeta.levelRangeMax));
		 }else{
			 var maxLevel = 99;
		 }
		 if(isNaN(minLevel) || minLevel <= 0)minLevel = 1;
		 if(isNaN(maxLevel) || maxLevel >= 100)maxLevel = 99;
		 this._level = this.getLevel(minLevel, maxLevel);
		 this._classId = actorData.classId;
		 this._actorEnemy = true;
	 }
	 synrecGameEnemySetup.call(this, enemyId, x, y);
 }
 
 Game_Enemy.prototype.getLevel = function(min, max){
	 return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 
 Game_Enemy.prototype.paramBase = function(paramId) {
	 if(this._actorEnemy){
		 var classParam = this.currentClass().params[paramId][this._level];
		 var enemParam = this.enemy().params[paramId];
		 var syncParam = classParam + enemParam;
		 return syncParam;
	 }else{
		 return this.enemy().params[paramId];
	 }
 }
 
 Game_Enemy.prototype.currentClass = function() {
	 return $dataClasses[this._classId];
 }
 
 function Game_AllActors(){
	 this.initialize.apply(this, arguments);
 }
 
 Game_AllActors.prototype.initialize = function(){
	 this._data = [];
	 this.createMonsterList();
 }
 
 Game_AllActors.prototype.createMonsterList = function(){
	 var monsterData = $dataActors;
	 for(i = 0; i < monsterData.length; i++){
		 if(monsterData[i]){
			 this._data[i]  = new Game_Actor(i);
		 }else{
			 this._data[i] = null;
		 }
	 }
	 return null;
 }
 
 Game_AllActors.prototype.actor = function(index){
	 if($dataActors[index]){
		 if(!this._data[index]){
			 this._data[index] = new Game_Actor(index);
		 }
		 return this._data[index];
	 }
 }
 
 synrecGameUnitRandomTarget = Game_Unit.prototype.randomTarget;
 Game_Unit.prototype.randomTarget = function() {
	 if(Synrec.MC.singleEnemy){
		 var target = this.aliveMembers()[0];
		 return target;
	 }else{
		 synrecGameUnitRandomTarget.call(this);
	 }
 }
 
 synrecGamePartyInitialize = Game_Party.prototype.initialize;
 Game_Party.prototype.initialize = function() {
	 synrecGamePartyInitialize.call(this);
	 if(!isNaN(Synrec.MC.maxReserveBoxes))this.createReserveBoxes();
 }
 
 Game_Party.prototype.createReserveBoxes = function(){
	 this._reserveActors = [];
	 for(i = 0; i < Synrec.MC.maxReserveBoxes; i++){
		 this._reserveActors.push([]);
	 }
 }
 
 Game_Party.prototype.name = function() {
	 return Synrec.MC.partyName;
 }
 
 Game_Party.prototype.allMembers = function() {
	 return this._actors;
 }
 
 Game_Party.prototype.maxBattleMembers = function() {
	 return 6;
 }
 
 Game_Party.prototype.setupStartingMembers = function() {
	 this._actors = [];
	 $dataSystem.partyMembers.forEach(function(actorId) {
		 if ($gameAllActors._data[actorId]) {
			 var actorData = $gameAllActors._data[actorId];
			 this._actors.push(actorData);
		 }
	 }, this);
 }
 
 Game_Party.prototype.setupBattleTestMembers = function() {
	 $dataSystem.testBattlers.forEach(function(battler) {
		 var actor = $gameAllActors.actor(battler.actorId);
		 if (actor) {
			 actor.changeLevel(battler.level, false);
			 actor.initEquips(battler.equips);
			 actor.recoverAll();
	 
			 this.addActor(battler.actorId);
		 }
	 }, this);
 }
 
 Game_Party.prototype.addActor = function(actorId, level, hp, mp) {
	 var inReserve = this.actorInReserve(actorId);
	 var actorData = new Game_Actor(actorId);
	 
	 level = level ? level : actorData.level;
	 hp = hp ? hp : actorData.hp;
	 mp = mp ? mp : actorData.mp;
	 
	 actorData._captureId = $gameSystem._captureId;
	 actorData.changeLevel(level);
	 actorData._hp = hp;
	 actorData._mp = mp;
	 if (this._actors.length < Synrec.MC.teamSize) {
		 this._actors.push(actorData);
		 $gameActors._data = this._actors;
		 $gamePlayer.refresh();
		 $gameMap.requestRefresh();
	 }else if(this._actors.length >= Synrec.MC.teamSize){
		 actorData.recoverAll();
		 this.addReserveActor(actorData);
		 $gamePlayer.refresh();
		 $gameMap.requestRefresh();
	 }else{
		 SoundManager.playBuzzer();
	 }
 }
 
 Game_Party.prototype.actorInReserve = function(actorId){
	 for(i = 0; i < this._reserveActors.length; i++){
		 var box = this._reserveActors[i];
		 for(j = 0; j < box.length; j++){
			 if(box[j]._actorId == actorId)return true;
		 }
	 }
	 return false
 }
 
 Game_Party.prototype.addReserveActor = function(actorId, index){
	 if(isNaN(index)){
		 index = 0;
	 }
	 if(this._reserveActors[index].length >= Synrec.MC.maxReserveMembers){
		 for(i = 0; i < this._reserveActors.length; i++){
			 if(this._reserveActors[i].length < Synrec.MC.maxReserveMembers){
				 index = i;
				 break;
			 }
		 }
	 }
	 if(this._reserveActors[index].length >= Synrec.MC.maxReserveMembers){
		 return false;
	 }else{
		 this._reserveActors[index].push(actorId);
	 }
 }
 
 Game_Party.prototype.releaseActor = function(index) {
	 if(index <= this._actors.length){
		 var actor = this._actors[index];
		 this._actors.splice(index, 1);
		 return actor;
	 }
 }
 
 Game_Party.prototype.releaseActorReserve = function(boxId, boxIndex) {
	 if(boxIndex <= this._reserveActors[boxId].length){
		 var actor = this._reserveActors[boxId][boxIndex];
		 this._reserveActors[boxId].splice(boxIndex, 1)
		 return actor;
	 }
 }
 
 Game_Party.prototype.removeActor = function(actorId) {
	 var inReserve = this.actorInReserve(actorId);
	 if(this._actors.length > 1){
		 for(i = 0; i < this._actors.length; i++){
			 var index = this._actors.length - (i + 1);
			 var actorChkId = this._actors[index]._actorId;
			 if(actorChkId == actorId)this.releaseActor(index);
		 }
	 }
	 if(inReserve){
		 for(j = 0; j < this._reserveActors.length; j++){
			 var box = this._reserveActors[j]
			 for (k = 0; k < box.length; k++){
				 var index = box.length - (k + 1);
				 var actorChkId = box[index]._actorId;
				 if(actorChkId == actorId)this.releaseActorReserve(j, index);
			 }
		 }
	 }
 }
 
 Game_Party.prototype.removeReserve = function(actorId, box){
	 if(this._reserveActors[box].contains(actorId)){
		 this._reserveActors[box].splice(this._reserveActors[box].indexOf(actorId), 1);
		 $gamePlayer.refresh();
		 $gameMap.requestRefresh();
	 }
 }
 
 Game_Party.prototype.swapActiveReserve = function(partyIndex, reserveBox, reserveIndex){
	 var partySize = $gameParty._actors.length;
	 var temp1 = this._actors[partyIndex];
	 var temp2 = this._reserveActors[reserveBox][reserveIndex];
	 if(temp1 && temp2){
		 this._actors[partyIndex] = temp2;
		 this._reserveActors[reserveBox][reserveIndex] = temp1;
	 }else if(temp1 && !temp2){
		 if(partySize > 1){
			 this._reserveActors[reserveBox].push(temp1);
			 this._actors.splice(this._actors.indexOf(temp1), 1);
		 }
	 }else if(!temp1 && temp2){
		 this._actors.push(temp2);
		 this._reserveActors[reserveBox].splice(this._reserveActors[reserveBox].indexOf(temp2), 1);
	 }
	 $gamePlayer.refresh();
 }
 
 Game_Party.prototype.menuActor = function() {
	 var actor = this._actors[this._menuActorId];
	 if (!actor) {
		 actor = this.members()[0];
		 if(!actor)return null;
	 }
	 return actor;
 }
 
 Game_Party.prototype.setMenuActor = function(index) {
	 this._menuActorId = index;
 }
 
 Game_Party.prototype.makeMenuActorNext = function() {
	 var index = this.members().indexOf(this.menuActor());
	 if (index >= 0) {
		 index = (index + 1) % this.members().length;
		 this.setMenuActor(index);
	 } else {
		 this.setMenuActor(0);
	 }
 }
 
 Game_Party.prototype.makeMenuActorPrevious = function() {
	 var index = this.members().indexOf(this.menuActor());
	 if (index >= 0) {
		 index = (index + this.members().length - 1) % this.members().length;
		 this.setMenuActor(index);
	 } else {
		 this.setMenuActor(0);
	 }
 }
 
 Game_Party.prototype.targetActor = function() {
	 var actor = this._actors[this._targetActorId];
	 if (!actor) {
		 actor = this.members()[0];
		 if(!actor)return null;
	 }
	 return actor;
 };
 
 Game_Party.prototype.setTargetActor = function(actor) {
	 this._targetActorId = actor.actorId();
 }
 
 Game_Troop.prototype.meetsConditions = function(page) {
	 var c = page.conditions;
	 if (!c.turnEnding && !c.turnValid && !c.enemyValid &&
			 !c.actorValid && !c.switchValid) {
		 return false;  // Conditions not set
	 }
	 if (c.turnEnding) {
		 if (!BattleManager.isTurnEnd()) {
			 return false;
		 }
	 }
	 if (c.turnValid) {
		 var n = this._turnCount;
		 var a = c.turnA;
		 var b = c.turnB;
		 if ((b === 0 && n !== a)) {
			 return false;
		 }
		 if ((b > 0 && (n < 1 || n < a || n % b !== a % b))) {
			 return false;
		 }
	 }
	 if (c.enemyValid) {
		 var enemy = $gameTroop.members()[c.enemyIndex];
		 if (!enemy || enemy.hpRate() * 100 > c.enemyHp) {
			 return false;
		 }
	 }
	 if (c.actorValid) {
		 var actor = $gameParty._actors[c.actorId];
		 if (!actor || actor.hpRate() * 100 > c.actorHp) {
			 return false;
		 }
	 }
	 if (c.switchValid) {
		 if (!$gameSwitches.value(c.switchId)) {
			 return false;
		 }
	 }
	 return true;
 };
 
 synrecGamePlayerRefresh = Game_Player.prototype.refresh;
 Game_Player.prototype.refresh = function() {
	 if(Synrec.MC.NonBattlePlayerActor){
		 var actorId = Synrec.MC.playerActor;
		 if(isNaN(actorId))actorId = 1;
		 var actorData = $dataActors[actorId];
		 var actor = actorData;
		 var characterName = actor ? actor.characterName : 'N/A';
		 var characterIndex = actor ? actor.characterIndex : 0;
		 this.setImage(characterName, characterIndex);
		 this._followers.refresh();
	 }else{
		 synrecGamePlayerRefresh.call(this);
	 }
 }
 
 synrecGameFollowersInit = Game_Followers.prototype.initialize;
 Game_Followers.prototype.initialize = function() {
	 if(Synrec.MC.NonBattlePlayerActor){
		 this._visible = $dataSystem.optFollowers;
		 this._gathering = false;
		 this._data = [];
		 for (var i = 0; i < Synrec.MC.monsterFollowLimit; i++) {
			 this._data.push(new Game_Follower(i));
		 }
	 }else{
		 synrecGameFollowersInit.call(this);
	 }
 }
 
 Game_Event.prototype.meetsConditions = function(page) {
	 var c = page.conditions;
	 if (c.switch1Valid) {
		 if (!$gameSwitches.value(c.switch1Id)) {
			 return false;
		 }
	 }
	 if (c.switch2Valid) {
		 if (!$gameSwitches.value(c.switch2Id)) {
			 return false;
		 }
	 }
	 if (c.variableValid) {
		 if ($gameVariables.value(c.variableId) < c.variableValue) {
			 return false;
		 }
	 }
	 if (c.selfSwitchValid) {
		 var key = [this._mapId, this._eventId, c.selfSwitchCh];
		 if ($gameSelfSwitches.value(key) !== true) {
			 return false;
		 }
	 }
	 if (c.itemValid) {
		 var item = $dataItems[c.itemId];
		 if (!$gameParty.hasItem(item)) {
			 return false;
		 }
	 }
	 if (c.actorValid) {
		 var actor = $gameAllActors.actor[c.actorId];
		 if (!$gameParty.members().contains(actor)) {
			 return false;
		 }
	 }
	 return true;
 }
 
 if(Synrec.MC.singleEnemy){
	 Spriteset_Battle.prototype.update = function() {
		 Spriteset_Base.prototype.update.call(this);
		 this.updateActors();
		 this.updateEnemies();
		 this.updateBattleback();
	 }
	 
	 Spriteset_Battle.prototype.createActors = function() {
		 var actors = $gameParty.members();
		 for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
			 this._actorSprite = new Sprite_Actor(actors[0]);
			 this._battleField.addChild(this._actorSprite);
		 }
	 };
 
	 Spriteset_Battle.prototype.createEnemies = function() {
		 var enemies = $gameTroop.members();
		 for (var i = 0; i < enemies.length; i++) {
			 if(!this._enemySprite){
				 this._enemySprite = new Sprite_Enemy(enemies[i]);
				 this._battleField.addChild(this._enemySprite);
				 this._troopIndex = i;
			 }
		 }
	 }
 
	 Spriteset_Battle.prototype.updateActors = function() {
		 var members = $gameParty.members();
		 var aliveLeader = $gameParty.leader().isAlive();
		 for (var i = 0; i < members.length; i++) {
			 if(members[i].isAlive() && !aliveLeader){
				 var indexLead = 0;
				 var indexSwap = i;
				 $gameParty.swapOrder(indexLead, indexSwap);
				 this._actorSprite.setBattler(members[0]);
			 }
		 }
	 }
 
	 Spriteset_Battle.prototype.updateEnemies = function() {
		 var enemies = $gameTroop.members();
		 var enemy = enemies[this._troopIndex];
		 for (var i = 0; i < enemies.length; i++) {
			 if(this._enemySprite._battler){
				 if(enemies[i].isAlive() && !enemy.isAlive()){
					 enemies[i]._hidden = false;
					 this._enemySprite.setBattler(enemies[i]);
					 this._troopIndex = i;
				 }else{
					 this._enemySprite._battler._screenX = Synrec.MC.singleEnemyScreenX;
					 this._enemySprite._battler._screenY = Synrec.MC.singleEnemyScreenY;
					 var battler = this._enemySprite._battler;
					 this._enemySprite.setHome(battler.screenX(), battler.screenY());
				 }
			 }
		 }
	 }
	 
	 Spriteset_Battle.prototype.battlerSprites = function() {
		 var battleSprites = [this._enemySprite, this._actorSprite];
		 return battleSprites;
	 };
 }
 
 function Window_TeamCommand (){
	 this.initialize.apply(this, arguments);
 }
 
 Window_TeamCommand.prototype = Object.create(Window_Command.prototype);
 Window_TeamCommand.prototype.constructor = Window_TeamCommand;
 
 Window_TeamCommand.prototype.windowWidth = function(){
	 return SceneManager._screenWidth;
 }
 
 Window_TeamCommand.prototype.numVisibleRows = function(){
	 return 1;
 }
 
 Window_TeamCommand.prototype.maxCols = function() {
	 return 2;
 }
 
 Window_TeamCommand.prototype.makeCommandList = function() {
	 this.addCommand(Synrec.ZzyMC.ModifyPartyText, 'modify');
	 this.addCommand(Synrec.ZzyMC.EndText, 'end');
 }
 
 function Window_TeamWindow(){
	 this.initialize.apply(this, arguments);
 }
 
 Window_TeamWindow.prototype = Object.create(Window_Selectable.prototype);
 Window_TeamWindow.prototype.constructor = Window_TeamWindow;
 
 Window_TeamWindow.prototype.maxCols = function(){
	 return 1;
 }
 
 Window_TeamWindow.prototype.maxItems = function(){
	 return Synrec.MC.teamSize;
 }
 
 Window_TeamWindow.prototype.itemWidth = function() {
	 return Math.floor((this.width - this.padding * 2 +
						this.spacing()) / this.maxCols() - this.spacing());
 }
 
 Window_TeamWindow.prototype.itemHeight = function() {
	 return 48;
 }
 
 Window_TeamWindow.prototype.drawItem = function(index){
	 var data = $gameParty._actors[index];
	 if(data){
		 var rect = this.itemRect(index);
		 this.drawActorCharacter(data, rect.x + 24, rect.y + 48);
		 this.drawActorName(data, rect.x + 72, rect.y);
	 }
 }
 
 Window_TeamWindow.prototype.currentItem = function(){
	 var index = this._index;
	 return $gameParty._actors[index];
 }
 
 Window_TeamWindow.prototype.isReserveable = function(actorId) {
	 if(Synrec.MC.lockedMonsters.contains(actorId)){
		 return false;
	 }else{
		 return true;
	 }
 }
 
 Window_TeamWindow.prototype.refresh = function(){
	 this.contents.clear();
	 this.drawAllItems();
 }
 
 function Window_TeamReserve(){
	 this.initialize.apply(this, arguments);
 }
 
 Window_TeamReserve.prototype = Object.create(Window_Selectable.prototype);
 Window_TeamReserve.prototype.constructor = Window_TeamReserve;
 
 Window_TeamReserve.prototype.maxCols = function(){
	 return 1;
 }
 
 Window_TeamReserve.prototype.maxItems = function(){
	 return Synrec.MC.maxReserveMembers;
 }
 
 Window_TeamReserve.prototype.itemWidth = function() {
	 return Math.floor((this.width - this.padding * 2 +
						this.spacing()) / this.maxCols() - this.spacing());
 }
 
 Window_TeamReserve.prototype.itemHeight = function() {
	 return 48;
 }
 
 Window_TeamReserve.prototype.getData = function(data, boxIndex){
	 this._data = data;
	 this._reserveIndex = boxIndex;
 }
 
 Window_TeamReserve.prototype.drawItem = function(index){
	 if(this._data){
		 var data = this._data[index];
		 if(data){
			 var rect = this.itemRect(index);
			 this.drawActorCharacter(data, rect.x + 24, rect.y + 48);
			 this.drawActorName(data, rect.x + 72, rect.y);
		 }
	 }
 }
 
 Window_TeamReserve.prototype.currentItem = function(){
	 var box = this._reserveIndex;
	 var index = this.index();
	 return $gameParty._reserveActors[box][index];
 }
 
 Window_TeamReserve.prototype.refresh = function(){
	 this.contents.clear();
	 this.drawAllItems();
 }
 
 function Window_BoxChoice(){
	 this.initialize.apply(this, arguments);
 }
 
 Window_BoxChoice.prototype = Object.create(Window_Selectable.prototype);
 Window_BoxChoice.prototype.constructor = Window_BoxChoice;
 
 Window_BoxChoice.prototype.update = function(){
	 Window_Selectable.prototype.update.call(this);
	 if(isNaN(this._boxNumber))this._boxNumber = 0;
	 this.refresh();
 }
 
 Window_BoxChoice.prototype.maxItems = function(){
	 return 1;
 }
 
 
 Window_BoxChoice.prototype.drawBoxNumber = function(){
	 var number = this._boxNumber;
	 if(!isNaN(number)){
		 var textWidth = this.textWidth(Synrec.ZzyMC.MonsterBoxText + number);
		 this.drawText(Synrec.ZzyMC.MonsterBoxText + number, (this.width / 2) - (textWidth / 2), 0)
	 }
 }
 
 Window_BoxChoice.prototype.cursorDown = function(wrap){
	 Window_Selectable.prototype.cursorDown.call(this, wrap);
	 SoundManager.playCursor();
	 this._boxNumber = 0;
 }
 
 Window_BoxChoice.prototype.cursorUp = function(wrap){
	 Window_Selectable.prototype.cursorDown.call(this, wrap);
	 SoundManager.playCursor();
	 this._boxNumber = Synrec.MC.maxReserveBoxes - 1;
 }
 
 Window_BoxChoice.prototype.cursorRight = function(wrap){
	 Window_Selectable.prototype.cursorRight.call(this, wrap);
	 if(this._boxNumber < Synrec.MC.maxReserveBoxes - 1){
		 SoundManager.playCursor();
		 this._boxNumber++;
	 }
 }
 
 Window_BoxChoice.prototype.cursorLeft = function(wrap){
	 Window_Selectable.prototype.cursorLeft.call(this, wrap);
	 if(this._boxNumber > 0){
		 SoundManager.playCursor();
		 this._boxNumber--;
	 }
 }
 
 Window_BoxChoice.prototype.refresh = function(){
	 this.contents.clear();
	 this.drawBoxNumber();
 }
 
 Window_Base.prototype.drawHpCustomGauge = function(x, y, width, hp, maxHp){
	 var backColor1 = '#000000';
	 var backColor2 = '#bbbbbb';
	 var hpColor1 = Synrec.MC.HpColor1;
	 var hpColor2 = Synrec.MC.HpColor2;
	 rateWidth = Math.floor((hp / maxHp) * width);
	 if(isNaN(rateWidth))rateWidth = 0;
	 this.contents.gradientFillRect(x, y, width, 30, backColor1, backColor2);
	 this.contents.gradientFillRect(x, y + 2, rateWidth, 26, hpColor1, hpColor2);
 }
 
 Window_Base.prototype.drawMpCustomGauge = function(x, y, width, mp, maxMp){
	 var backColor1 = '#000000';
	 var backColor2 = '#bbbbbb';
	 var mpColor1 = Synrec.MC.MpColor1;
	 var mpColor2 = Synrec.MC.MpColor2;
	 rateWidth = Math.floor((mp / maxMp) * width);
	 if(isNaN(rateWidth))rateWidth = 0;
	 this.contents.gradientFillRect(x, y, width, 30, backColor1, backColor2);
	 this.contents.gradientFillRect(x, y + 2, rateWidth, 26, mpColor1, mpColor2);
 }
 
 Window_Base.prototype.drawTpCustomGauge = function(x, y, width, tp){
	 var backColor1 = '#000000';
	 var backColor2 = '#bbbbbb';
	 var tpColor1 = Synrec.MC.TpColor1;
	 var tpColor2 = Synrec.MC.TpColor2;
	 rateWidth = Math.floor((tp / 100) * width);
	 if(isNaN(rateWidth))rateWidth = 0;
	 this.contents.gradientFillRect(x, y, width, 30, backColor1, backColor2);
	 this.contents.gradientFillRect(x, y + 2, rateWidth, 26, tpColor1, tpColor2);
 }
 
 function Window_ActorStatus(){
	 this.initialize.apply(this, arguments);
 }
 
 Window_ActorStatus.prototype = Object.create(Window_Base.prototype);
 Window_ActorStatus.prototype.constructor = Window_ActorStatus;
 
 Window_ActorStatus.prototype.update = function(){
	 Window_Base.prototype.update.call(this);
	 this.refresh();
 }
 
 Window_ActorStatus.prototype.teamSize = function(num){
	 this._teamSize = num;
	 if(isNaN(this._teamSize) || this._teamSize <= 0)this._teamSize = 1;
 }
 
 Window_ActorStatus.prototype.drawData = function(){
	 var actorCnt = $gameParty._actors.length;
	 if(isNaN(this._teamSize) || this._teamSize <= 0)this._teamSize = 1;
	 for(i = 0; i < this._teamSize; i++){
		 var data = $gameParty._actors[i];
		 var iconWidth = Window_Base._iconWidth;
		 var gaugeWidth = this.width - (iconWidth + this.standardPadding() * 2);
		 var name = data._name;
		 var level = data._level;
		 var hp = data._hp;
		 var maxHp = data.param(0);
		 var hpRate = hp / maxHp;
		 if(hpRate <= 0.2){
			 this.deathColor();
		 }else if(hpRate <= 0.4){
			 this.crisisColor();
		 }else{
			 this.resetFontSettings();
		 }
		 var mp = data._mp;
		 var maxMp = data.param(1);
		 var tp = data._tp;
		 var hpIcon = Synrec.MC.HpIcon;
		 var mpIcon = Synrec.MC.MpIcon;
		 var tpIcon = Synrec.MC.TpIcon;
		 var height = i * (this.lineHeight() * 4);
		 this.drawText(name, 0, height);
		 var nameWidth = this.textWidth(name);
		 this.drawText(TextManager.levelA + ': ' + level, nameWidth + 12, height);
		 this.drawIcon(hpIcon, 0, this.lineHeight() + height);
		 this.drawHpCustomGauge(iconWidth, this.lineHeight() + height, gaugeWidth, hp, maxHp);
		 if(Synrec.MC.ActorMpBar){
			 this.drawIcon(mpIcon, 0, this.lineHeight() * 2 + height);
			 this.drawMpCustomGauge(iconWidth, this.lineHeight() * 2 + height, gaugeWidth, mp, maxMp);
		 }
		 if(Synrec.MC.ActorTpBar && !Synrec.MC.ActorMpBar){
			 this.drawIcon(tpIcon, 0, this.lineHeight() * 2 + height);
			 this.drawTpCustomGauge(iconWidth, this.lineHeight() * 2 + height, gaugeWidth, tp);
		 }else if (Synrec.MC.ActorTpBar && Synrec.MC.ActorMpBar){
			 this.drawIcon(tpIcon, 0, this.lineHeight() * 3 + height);
			 this.drawTpCustomGauge(iconWidth, this.lineHeight() * 3 + height, gaugeWidth, tp);
		 }
		 this.resetFontSettings();
	 }
	 if(!Synrec.MC.ActorTpBar && !Synrec.MC.ActorMpBar)var winHeight = ((this.lineHeight() * 3) * this._teamSize + 1);
	 if(!Synrec.MC.ActorTpBar && Synrec.MC.ActorMpBar)var winHeight = ((this.lineHeight() * 4) * this._teamSize + 1);
	 if(Synrec.MC.ActorTpBar && Synrec.MC.ActorMpBar)var winHeight = ((this.lineHeight() * 5) * this._teamSize + 1);
	 this.move(this.x, this.y, this.width, winHeight);
 }
 
 Window_ActorStatus.prototype.refresh = function(){
	 this.contents.clear();
	 this.drawData();
 }
 
 function Window_EnemyStatus(){
	 this.initialize.apply(this, arguments);
 }
 
 Window_EnemyStatus.prototype = Object.create(Window_Base.prototype);
 Window_EnemyStatus.prototype.constructor = Window_EnemyStatus;
 
 Window_EnemyStatus.prototype.update = function(){
	 Window_Base.prototype.update.call(this);
	 this.refresh();
 }
 
 Window_EnemyStatus.prototype.drawData = function(){
	 var enemyCnt = $gameTroop._enemies.length;
	 for(i = 0; i < enemyCnt; i++){
		 var data = $gameTroop._enemies[i];
		 var iconWidth = Window_Base._iconWidth;
		 var gaugeWidth = this.width - (iconWidth + this.standardPadding() * 2);
		 var name = data._name;
		 var level = data._level;
		 var hp = data._hp;
		 var maxHp = data.param(0);
		 var hpRate = hp / maxHp;
		 if(hpRate <= 0.2){
			 this.deathColor();
		 }else if(hpRate <= 0.4){
			 this.crisisColor();
		 }else{
			 this.resetFontSettings();
		 }
		 var mp = data._mp;
		 var maxMp = data.param(1);
		 var tp = data._tp;
		 var hpIcon = Synrec.MC.HpIcon;
		 var mpIcon = Synrec.MC.MpIcon;
		 var tpIcon = Synrec.MC.TpIcon;
		 if(!Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar)var height = i * (this.lineHeight() * 2);
		 if(!Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar)var height = i * (this.lineHeight() * 3);
		 if(Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar)var height = i * (this.lineHeight() * 3);
		 if(Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar)var height = i * (this.lineHeight() * 4);
		 this.drawText(name, 0, height);
		 var nameWidth = this.textWidth(name);
		 this.drawText(TextManager.levelA + ': ' + level, nameWidth + 12, height);
		 this.drawIcon(hpIcon, 0, this.lineHeight() + height);
		 this.drawHpCustomGauge(iconWidth, this.lineHeight() + height, gaugeWidth, hp, maxHp);
		 if(Synrec.MC.EnemyMpBar){
			 this.drawIcon(mpIcon, 0, this.lineHeight() * 2 + height);
			 this.drawMpCustomGauge(iconWidth, this.lineHeight() * 2 + height, gaugeWidth, mp, maxMp);
		 }
		 if(Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar){
			 this.drawIcon(tpIcon, 0, this.lineHeight() * 2 + height);
			 this.drawTpCustomGauge(iconWidth, this.lineHeight() * 2 + height, gaugeWidth, tp);
		 }else if (Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar){
			 this.drawIcon(tpIcon, 0, this.lineHeight() * 3 + height);
			 this.drawTpCustomGauge(iconWidth, this.lineHeight() * 3 + height, gaugeWidth, tp);
		 }
		 this.resetFontSettings();
	 }
	 // if(!Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 3) * enemyCnt + 1) - 36;
	 // if(!Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 4) * enemyCnt + 1) - 36;
	 // if(Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 4) * enemyCnt + 1) - 36;
	 // if(Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 5) * enemyCnt + 1) - 36;
	 
	 if(!Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 3) * enemyCnt + 1);
	 if(!Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 4) * enemyCnt + 1);
	 if(Synrec.MC.EnemyTpBar && !Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 4) * enemyCnt + 1);
	 if(Synrec.MC.EnemyTpBar && Synrec.MC.EnemyMpBar)var winHeight = ((this.lineHeight() * 5) * enemyCnt + 1);
 
	 this.move(this.x, this.y, this.width, winHeight);
	 
 }
 
 Window_EnemyStatus.prototype.refresh = function(){
	 this.contents.clear();
	 this.drawData();
 }
 
 synrecSceneBattleUpdate = Scene_Battle.prototype.update;
 Scene_Battle.prototype.update = function() {
	 if(customUI){
		 var active = this.isActive();
		 $gameTimer.update(active);
		 $gameScreen.update();
		 this.updateStatusWindow();
		 this.updateWindowPositions();
		 if (active && !this.isBusy()) {
			 if(this._logWindow._lines.length > 0){
				 this._enemyStatusWindow.hide();
			 }else if(this._logWindow._lines.length <= 0){
				 this._enemyStatusWindow.show();
			 }
			 this._enemyIndex = this._spriteset._troopIndex;
			 this._currentEnemy = $gameTroop.members()[this._enemyIndex];
			 BattleManager._currentEnemy = this._currentEnemy;
			 this.updateBattleProcess();
		 }	
		 
		 //修正显示位图的位置
		 this.updateZzyMCStatusWindow();	
		 
		 Scene_Base.prototype.update.call(this);
	 }else{
		 synrecSceneBattleUpdate.call(this);
	 }
 }
 
 synrecSceneBattleCreateAllWindows = Scene_Battle.prototype.createAllWindows;
 Scene_Battle.prototype.createAllWindows = function() {
	 if(customUI){
		 this.createLogWindow();
		 this.createStatusWindow();
		 this.createPartyCommandWindow();
		 this.createActorCommandWindow();
		 this.createActorStatusWindow();
		 this.createEnemyStatusWindow();
		 this.createHelpWindow();
		 this.createSkillWindow();
		 this.createItemWindow();
		 this.createActorWindow();
		 this.createEnemyWindow();
		 this.createMessageWindow();
		 this.createScrollTextWindow();
	 }else{
		 synrecSceneBattleCreateAllWindows.call(this);
	 }
 }
 
 Scene_Battle.prototype.createActorStatusWindow = function(){
	 var x = SceneManager._screenWidth - 300;
	 var y = SceneManager._screenHeight -  388;
	 var width = 300;
	 var height = SceneManager._screenHeight;
	 this._actorStatusWindow = new Window_ActorStatus(x, y, width, height);
	 this._actorStatusWindow.refresh();
	 this._actorStatusWindow.close();
	 this.addWindow(this._actorStatusWindow);
 }
 
 Scene_Battle.prototype.createEnemyStatusWindow = function(){
	 var x = 0;
	 var y = 0;
	 var width = 300;
	 var height = SceneManager._screenHeight;
	 this._enemyStatusWindow = new Window_EnemyStatus(x, y, width, height);
	 this._enemyStatusWindow.refresh();
	 this._enemyStatusWindow.close();
	 this.addWindow(this._enemyStatusWindow);
 }
 
 synrecSceneBattleStartPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
 Scene_Battle.prototype.startPartyCommandSelection = function() {
	 if(customUI){
		 this.refreshStatus();
		 this._statusWindow.deselect();
		 this._actorStatusWindow.open();
		 this._enemyStatusWindow.open();
		 this._statusWindow.open();
		 this._actorCommandWindow.close();
		 this._partyCommandWindow.setup();
	 }else{
		 synrecSceneBattleStartPartyCommandSelection.call(this);
	 }
 }
 
 synrecSceneBattleRefreshStatus = Scene_Battle.prototype.refreshStatus;
 Scene_Battle.prototype.refreshStatus = function() {
	 if(customUI){
		 this._actorStatusWindow.refresh();
		 this._enemyStatusWindow.refresh();
		 this._statusWindow.refresh();
	 }else{
		 synrecSceneBattleRefreshStatus.call(this);
	 }
 }
 
 synrecSceneBattleEnemySelection = Scene_Battle.prototype.selectEnemySelection
 Scene_Battle.prototype.selectEnemySelection = function() {
	 synrecSceneBattleEnemySelection.call(this);
	 this.onEnemyOk();
 }
 
 synrecSceneBattleOnEnemyOk = Scene_Battle.prototype.onEnemyOk
 Scene_Battle.prototype.onEnemyOk = function() {
	 var action = BattleManager.inputtingAction();
	 action.setTarget(this._enemyWindow.enemyIndex());
	 this._enemyWindow.hide();
	 this._skillWindow.hide();
	 this._itemWindow.hide();
	 if(Synrec.MC.singleEnemy){
		 BattleManager.startTurn();
		 this._enemyWindow.deselect();
		 this._enemyWindow.deactivate();
	 }else{
		 this.selectNextCommand();
	 }
 };
 
 function Scene_MonsterBox (){
	 this.initialize.apply(this, arguments);
 }
 
 Scene_MonsterBox.prototype = Object.create(Scene_MenuBase.prototype);
 Scene_MonsterBox.prototype.constructor = Scene_MonsterBox;
 
 Scene_MonsterBox.prototype.update = function(){
	 Scene_MenuBase.prototype.update.call(this);
	 if(this._boxChoice.active){
		 var boxNumber = this._boxChoice._boxNumber;
		 this._reserveWindow.getData($gameParty._reserveActors[boxNumber], boxNumber);
		 this._reserveWindow.refresh();
	 }
 }
 
 Scene_MonsterBox.prototype.create = function(){
	 this.createBackground();
	 this.createWindowLayer();
	 this.createTeamCommandWindow();
	 this.createTeamReserveBox();
	 this.createReserveChoiceWindow();
	 this.createTeamWindow();
	 if(!isNaN($gameSystem._reservePartyBox)){
		 this._rserveBox = $gameSystem._reservePartyBox;
		 this._singleBoxMode = true;
		 this.openSingleReserve();
	 }
 }
 
 Scene_MonsterBox.prototype.createBackground = function(){
	 
 }
 
 Scene_MonsterBox.prototype.createTeamCommandWindow = function(){
	 var x = 0;
	 var y = 0;
	 this._teamCommand = new Window_TeamCommand(x, y);
	 this._teamCommand.setHandler('modify', this.modifyParty.bind(this));
	 this._teamCommand.setHandler('end', this.closeScene.bind(this));
	 this._teamCommand.setHandler('cancel', this.closeScene.bind(this));
	 this.addWindow(this._teamCommand);
 }
 
 Scene_MonsterBox.prototype.createTeamWindow = function(){
	 var x = 0;
	 var y = 72;
	 var width = SceneManager._screenWidth / 2;
	 var height = SceneManager._screenHeight / 2;
	 this._teamWindow = new Window_TeamWindow(x, y, width, height);
	 this._teamWindow.setHandler('ok', this.onTeamWindowOk.bind(this));
	 this._teamWindow.setHandler('cancel', this.onTeamWindowCancel.bind(this));
	 this._teamWindow.refresh();
	 this._teamWindow.deactivate();
	 this._teamWindow.close();
	 this.addWindow(this._teamWindow);
 }
 
 Scene_MonsterBox.prototype.createTeamReserveBox = function(){
	 var x = 0;
	 var y = 144;
	 var width = SceneManager._screenWidth;
	 var height = SceneManager._screenHeight - 144;
	 this._reserveWindow = new Window_TeamReserve(x, y, width, height);
	 this._reserveWindow.setHandler('ok', this.onReserveBoxOk.bind(this));
	 this._reserveWindow.setHandler('cancel', this.onReserveBoxCancel.bind(this));
	 this._reserveWindow.deactivate();
	 this.addWindow(this._reserveWindow);
 }
 
 Scene_MonsterBox.prototype.createReserveChoiceWindow = function(){
	 var x = SceneManager._screenWidth / 2;
	 var y = 72
	 var width = SceneManager._screenWidth / 2;
	 var height = 72;
	 this._boxChoice = new Window_BoxChoice(x, y, width, height);
	 this._boxChoice.setHandler('ok', this.startModify.bind(this));
	 this._boxChoice.setHandler('cancel', this.cancelModifyParty.bind(this));
	 this.addWindow(this._boxChoice);
 }
 
 Scene_MonsterBox.prototype.openSingleReserve = function(){
	 this._teamCommand.deactivate();
	 this._teamCommand.deselect();
	 this._boxChoice.hide();
	 this._boxChoice._boxNumber = $gameSystem._reservePartyBox;
	 var boxNumber = this._boxChoice._boxNumber;
	 this._boxChoice.deactivate();
	 this._reserveWindow.move(0, 72, SceneManager._screenWidth, SceneManager._screenHeight - 72);
	 this._reserveWindow.getData($gameParty._reserveActors[boxNumber], boxNumber);
	 this._reserveWindow.activate();
	 this._reserveWindow.refresh();
 }
 
 Scene_MonsterBox.prototype.modifyParty = function(){
	 this._teamCommand.deactivate();
	 this._boxChoice.activate();
	 this._boxChoice.select(0);
 }
 
 Scene_MonsterBox.prototype.cancelModifyParty = function(){
	 this._teamCommand.activate();
	 this._teamCommand.select(0);
	 this._boxChoice.deactivate();
 }
 
 Scene_MonsterBox.prototype.startModify = function(){
	 this._teamCommand.deactivate();
	 this._boxChoice.deactivate();
	 this._teamCommand.deselect();
	 this._boxChoice.deselect();
	 var boxNumber = this._boxChoice._boxNumber;
	 this._reserveWindow.getData($gameParty._reserveActors[boxNumber], boxNumber);
	 this._reserveWindow.refresh();
	 this._reserveWindow.activate();
	 this._reserveWindow.select(0);
 }
 
 Scene_MonsterBox.prototype.onTeamWindowOk = function(){
	 var partyMember = this._teamWindow.index();
	 var actor = this._teamWindow.currentItem();
	 var reserveActor = this._reserveWindow.currentItem();
	 if(actor && !reserveActor){
		 if(this._teamWindow.isReserveable(actor._actorId)){
			 var boxNumber = this._boxChoice._boxNumber;
			 var reserveMember = this._reserveWindow.index();
			 $gameParty.swapActiveReserve(partyMember, boxNumber, reserveMember);
			 this._reserveWindow.refresh();
			 this._teamWindow.deselect();
			 this._teamWindow.refresh();
			 this._reserveWindow.activate();
			 this._teamWindow.deactivate();
			 this._teamWindow.close();
		 }else{
			 this._teamWindow.activate();
			 SoundManager.playBuzzer();
		 }
	 }else if(actor && reserveActor){
		 if(this._teamWindow.isReserveable(actor._actorId)){
			 var boxNumber = this._boxChoice._boxNumber;
			 var reserveMember = this._reserveWindow.index();
			 $gameParty.swapActiveReserve(partyMember, boxNumber, reserveMember);
			 this._reserveWindow.refresh();
			 this._teamWindow.deselect();
			 this._teamWindow.refresh();
			 this._reserveWindow.activate();
			 this._teamWindow.deactivate();
		 }else{
			 this._teamWindow.activate();
			 SoundManager.playBuzzer();
		 }
	 }else if(!actor && reserveActor){
		 var boxNumber = this._boxChoice._boxNumber;
		 var reserveMember = this._reserveWindow.index();
		 $gameParty.swapActiveReserve(partyMember, boxNumber, reserveMember)
		 this._reserveWindow.refresh();
		 this._teamWindow.deselect();
		 this._teamWindow.refresh();
		 this._reserveWindow.activate();
		 this._teamWindow.deactivate();
	 }else{
		 this._teamWindow.activate();
		 SoundManager.playBuzzer();
	 }
 }
 
 Scene_MonsterBox.prototype.onTeamWindowCancel = function(){
	 this._reserveWindow.activate();
	 this._teamWindow.deactivate();
	 this._teamWindow.close();
 }
 
 Scene_MonsterBox.prototype.onReserveBoxOk = function(){
	 this._reserveWindow.deactivate();
	 this._teamWindow.activate();
	 this._teamWindow.open();
 }
 
 Scene_MonsterBox.prototype.onReserveBoxCancel = function(){
	 if(this._singleBoxMode){
		 $gameSystem._reservePartyBox = undefined;
		 SceneManager.pop();
	 }
	 this._boxChoice.activate();
	 this._boxChoice.select(0);
	 this._reserveWindow.deactivate();
	 this._reserveWindow.deselect();
 }
 
 Scene_MonsterBox.prototype.closeScene = function(){
	 SceneManager.pop();
 }
 
 
 //===============================================================
 //Scene_Battle
 //===============================================================
 
 //修改位置
 Synrec.ZzyMC.Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
 Scene_Battle.prototype.createStatusWindow = function() 
 {
	 Synrec.ZzyMC.Scene_Battle_createStatusWindow.call(this);
	 this.ZzyMCChangeStatusWindow();
	 
 };
 
 Scene_Battle.prototype.ZzyMCChangeStatusWindow = function()
 {
	 var srcHeight = this._statusWindow.height;
	 this._statusWindow.height = this._statusWindow.fittingHeight(1);
	 this._statusWindow.y += srcHeight - this._statusWindow.height;
	 
	 this._statusWindow.x = 0;
 }
 
 Window_BattleStatus.prototype.maxItems = function() //宽度改为1行
 {
	 return 1;
 };
 
 
 
 Synrec.ZzyMC.Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
 Scene_Battle.prototype.createPartyCommandWindow = function()
 {
	 Synrec.ZzyMC.Scene_Battle_createPartyCommandWindow.call(this);
	 this.ZzyMCChangePartyCommandWindow();
 }
 
 Scene_Battle.prototype.ZzyMCChangePartyCommandWindow = function()
 {
	 this._partyCommandWindow.x = Graphics.boxWidth - this._partyCommandWindow.width;
 }
 
 
 Synrec.ZzyMC.Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
 Scene_Battle.prototype.createActorCommandWindow = function()
 {
	 Synrec.ZzyMC.Scene_Battle_createActorCommandWindow.call(this);
	 this.ZzyMCChangeActorCommandWindow();
 }
 
 Scene_Battle.prototype.ZzyMCChangeActorCommandWindow = function()
 {
	 this._actorCommandWindow.x = Graphics.boxWidth - this._actorCommandWindow.width;
 }
 
 
 Synrec.ZzyMC.Scene_Battle_updateWindowPositions = Scene_Battle.prototype.updateWindowPositions;
 Scene_Battle.prototype.updateWindowPositions = function() 
 {
	 Synrec.ZzyMC.Scene_Battle_updateWindowPositions.call(this);
	 
	 this._statusWindow.x = 0;
	 
	 
	 //动态调整
	 // var statusX = 0;
	 // if (BattleManager.isInputting()) 
	 // {statusX = 0; } 	
	 // else {statusX = this._partyCommandWindow.width/2;}
	 
	 // if (this._statusWindow.x > statusX) {
		 // this._statusWindow.x -= 32;
		 // if (this._statusWindow.x < statusX) 
		 // {
			 // this._statusWindow.x = statusX;
		 // }
	 // }
 };
 
 
 Scene_Battle.prototype.updateZzyMCStatusWindow = function()
 {
	 this._actorStatusWindow.x = Graphics.boxWidth - this._actorStatusWindow.width - this._actorCommandWindow.width;
	 this._actorStatusWindow.y = Graphics.boxHeight - this._actorStatusWindow.height - this._statusWindow.height;
 }
 
 Synrec.ZzyMC.Scene_Battle_start = Scene_Battle.prototype.start;
 Scene_Battle.prototype.start = function() 
 {
	 Synrec.ZzyMC.Scene_Battle_start.call(this);
	 this.createZzyMCVDrawWindow();
	 
	 Synrec.ZzyMC.ShowVDraw = false;
	 this.addZzyMCVSprite();//添加位图
	 
	 
 };
 
 Scene_Battle.prototype.addZzyMCVSprite = function()
 {
	 var mArr = $gameParty.battleMembers();
	 for(var i=0;i<mArr.length;i++)
	 {
		 var actor = mArr[i];
		 if(actor && Synrec.ZzyMC.BitmapBuff[actor.actorId()])
		 {
			 
			 this._ZzyMCVDrawWindow.addChild(Synrec.ZzyMC.BitmapBuff[actor.actorId()]);
		 }
	 }
 }
 
 
 Scene_Battle.prototype.createZzyMCVDrawWindow = function()
 {
	 this._ZzyMCVDrawWindow = new Window_ZzyMCVDraw();
	 this.addChild(this._ZzyMCVDrawWindow);
 }
 
 
 //======================================================================
 //Game_Actor
 //======================================================================
 Synrec.ZzyMC.Game_Actor_onBattleStart = Game_Actor.prototype.onBattleStart;
 Game_Actor.prototype.onBattleStart = function()//战斗开始加载立绘
 {
	 Synrec.ZzyMC.Game_Actor_onBattleStart.call(this);
	 //this._ZzyMCSprite = undefined;
	 this.ReloadZzyMCVDrawSprite();
 }
 
 
 Game_Actor.prototype.ReloadZzyMCVDrawSprite = function()//加载系列图片
 {
	 var actorId = this.actorId();
	 
	 var info = Synrec.ZzyMC.GetActorInfo(actorId);
	 if(info)
	 {
		 Synrec.ZzyMC.BitmapBuff[this.actorId()] = new Sprite_ZzyVDraw(info,SceneManager._scene);
	 }
 }
 
 
 
 Synrec.ZzyMC.Game_Actor_performAction = Game_Actor.prototype.performAction;
 Game_Actor.prototype.performAction = function(action) 
 {
	 Synrec.ZzyMC.Game_Actor_performAction.call(this,action);
	 
	 //满足攻击
	 if(Synrec.ZzyMC.BitmapBuff[this.actorId()])
	 {
		 if (action.isAttack() || action.isMagicSkill() || action.isSkill() || action.isItem())
		 {
			 Synrec.ZzyMC.BitmapBuff[this.actorId()].SetAttack();//设置为攻击模式
		 }		
	 }
		 
 };
 
 
 Synrec.ZzyMC.Game_Actor_performDamage = Game_Actor.prototype.performDamage;
 Game_Actor.prototype.performDamage = function() 
 {
	 Synrec.ZzyMC.Game_Actor_performDamage.call(this);
	 
	 if(this.hp <= 0)//死亡
	 {
		 if(Synrec.ZzyMC.BitmapBuff[this.actorId()])
		 {Synrec.ZzyMC.BitmapBuff[this.actorId()].SetDeath();}//死亡
	 }
	 else
	 {
		 if(Synrec.ZzyMC.BitmapBuff[this.actorId()])
		 {Synrec.ZzyMC.BitmapBuff[this.actorId()].SetInjured();}//受伤
	 }
	 
 };
 
 //======================================================================
 //BattleManager
 //======================================================================
 Synrec.ZzyMC.BattleManager_processVictory = BattleManager.processVictory;
 BattleManager.processVictory = function() 
 {
	 Synrec.ZzyMC.BattleManager_processVictory.call(this);
	 Synrec.ZzyMC.ShowVDraw = false;
 };
 
 
 Synrec.ZzyMC.BattleManager_processDefeat = BattleManager.processDefeat;
 BattleManager.processDefeat = function() 
 {
	 Synrec.ZzyMC.BattleManager_processDefeat.call(this);
	 Synrec.ZzyMC.ShowVDraw = false;
 };
 
 
 
 
 
 
 
 //======================================================================
 //Window_ZzyMCVDraw
 //======================================================================
 
 function Window_ZzyMCVDraw() {
	 this.initialize.apply(this, arguments);
 }
 
 Window_ZzyMCVDraw.prototype = Object.create(Window_Base.prototype);
 Window_ZzyMCVDraw.prototype.constructor = Window_ZzyMCVDraw;
 
 Window_ZzyMCVDraw.prototype.initialize = function() 
 {
	 var width = Graphics.boxWidth;
	 var height = Graphics.boxHeight;
	 Window_Base.prototype.initialize.call(this, 0, 0, width, height);
	 
	 this.opacity = 0;//透明度
 };
 
 Window_ZzyMCVDraw.prototype.standardPadding = function() 
 {
	 return 0;
 };
 
 Window_ZzyMCVDraw.prototype.textPadding = function() 
 {
	 return 0;
 };
 
 
 
 //======================================================================
 //Sprite_ZzyVDraw
 //======================================================================
 
 function Sprite_ZzyVDraw() 
 {
	 this.initialize.apply(this, arguments);
 }
 
 Sprite_ZzyVDraw.prototype = Object.create(Sprite_Base.prototype);
 Sprite_ZzyVDraw.prototype.constructor = Sprite_ZzyVDraw;
 
 Sprite_ZzyVDraw.prototype.initialize = function(info,pointer) 
 {
	 Sprite_Base.prototype.initialize.call(this);
	 this.info = info;
	 this.pointer = pointer;
	 this.srcPosX = 0;
	 this.srcPosY = 0;
	 
	 this.anchor.x = 0.5;
	 this.anchor.y = 1;
	 
	 this.fadeInF = 20;
	 this.fadeInOfx = -10;
	 this.cFadeInOfx = 0;
	 this.fadeIning = false;
	 this.cFadeInF = 0;
	 
	 this.fadeOutF = 20;
	 this.fadeOutOfx = 10;
	 this.cFadeOutOfx = 0;
	 this.fadeOuting = false;
	 this.cFadeOutF = 0;
	 
	 this.shakeForce = 2;//晃动力量
	 this.shakeFrame = 30;//晃动帧数
	 this.cShakeFrame = 0;//晃动计时
	 this.shakeDir = 0;//晃动方向
	 this.shakeLimit = 5;//晃动极限
	 this.shakeOfx = 0;//晃动偏移
	 this.shaking = false;//晃动
	 
	 this.firstShow = true;//首次出现
	 this.deathFrame = 60;//死亡持续时长
	 this.deathOfChange = false;//死亡切换
 
	 //申请对象
	 this.bitmapArr = [];
	 this.RequestBitmapArr();
 
	 this._actionID = 0;//动作ID
	 this._cActionFrame = 0;//动作时长
	 this._nextActionID = 0;//下一次动作ID
	 
	 
	 this.visible = false;//出现隐身
	 this.InitPosition();
 };
 
 Sprite_ZzyVDraw.prototype.RequestBitmapArr = function()//申请位图数组
 {
	 this.bitmapArr = Synrec.ZzyMC.RequestBitmapArr(this.info);
 
 }
 
 Sprite_ZzyVDraw.prototype.InitPosition = function()
 {
	 this.x = Synrec.ZzyMC.VDrawOfPosX + this.info.Ofx;
	 this.y = Synrec.ZzyMC.VDrawOfPosY + this.info.Ofy;
	 
	 this.srcPosX = this.x;
	 this.srcPosY = this.y;
 
 }
 
 
 Sprite_ZzyVDraw.prototype.update = function()
 {
	 Sprite_Base.prototype.update.call(this);
	 
	 
 
	 if(!this.updateShow())return;
	 this.updateAppear();//更新出现状态
	 this.updatePosition();//更新位置
	 this.updateMotion();//更新贴图动作
 
 }
 
 Sprite_ZzyVDraw.prototype.updateShow = function()//更新显示情况
 {
	 if(!Synrec.ZzyMC.ShowVDraw)
	 {
		 this.visible = false;
		 return false;		
	 }
	 
	 if($gameMessage.hasText())
	 {
		 this.visible = false;
		 return false;		
	 }
	 
	 
	 if(Synrec.ZzyMC.DeathSprite)
	 {
		 if(Synrec.ZzyMC.DeathSprite === this)
		 {
			 if(this.deathOfChange)//满足死亡切换
			 {
				 Synrec.ZzyMC.DeathSprite = undefined;
			 }
			 this.visible = true;
			 return true;
		 }
		 else
		 {
			 this.visible = false;
			 return false;			
		 }
	 }
	 
	 if(this.info.ActorId !== $gameParty._actors[0].actorId())
	 {
		 this.visible = false;
		 return false;
	 }
	 else
	 {
		 this.visible = true;
	 }
	 return true;
 }
 
 
 
 
 
 Sprite_ZzyVDraw.prototype.updateMotion = function()//更新动作
 {
	 if(!this.GetActionID()){this.SetWait();}//设置为等待
	 
	 if(this._cActionFrame > 0)
	 {
		 this._cActionFrame--;
		 if(this._cActionFrame <= 0)
		 {		
			 this._cActionFrame = 0;	
			 if(this.GetActionID() === Synrec.ZzyMC.ACTION_DEATH)//死亡
			 {
				 this.deathOfChange = true;
			 }
			 else
			 {
				 if(this._nextActionID)
				 {
					 this.SetMotion(this._nextActionID);
				 }
				 else
				 {this._actionID = 0;}				
			 }
		 }
	 }
	 
 }
 
 
 Sprite_ZzyVDraw.prototype.GetActionID = function()
 {
	 return this._actionID;
 }
 
 
 
 
 Sprite_ZzyVDraw.prototype.updatePosition = function()
 {
	 this.x = this.srcPosX+this.cFadeInOfx+this.cFadeOutOfx;
	 
	 //更新晃动
	 if(this.shaking)
	 {
		 if(this.cShakeFrame < this.shakeFrame)
		 {
			 this.cShakeFrame++;
			 
			 if(this.shakeDir)
			 {
				 if(this.shakeOfx < this.shakeLimit)
				 {
					 this.shakeOfx += this.shakeForce;
				 }
				 else
				 {
					 this.shakeDir = 0;
				 }
			 }
			 else
			 {
				 if(this.shakeOfx > -this.shakeLimit)
				 {
					 this.shakeOfx -= this.shakeForce;
				 }
				 else
				 {
					 this.shakeDir = 1;
				 }
			 }
		 }
		 else
		 {
			 this.cShakeFrame = 0;
			 this.shakeOfx = 0;
			 this.shaking = false;
		 }
		 this.x += this.shakeOfx;
	 }
	 
 }
 
 Sprite_ZzyVDraw.prototype.updateAppear = function()
 {
	 if(this.fadeIning)
	 {
		 this.cFadeInF++;
		 this.opacity = 255 * this.cFadeInF / this.fadeInF;
		 this.cFadeInOfx = this.fadeInOfx - this.fadeInOfx * this.cFadeInF / this.fadeInF;
		 if(this.cFadeInF >= this.fadeInF)
		 {
			 this.cFadeInF = 0;
			 this.fadeIning = false;
			 this.opacity = 255;	
			 this.cFadeInOfx = 0;
		 }
	 }
	 
	 if(this.fadeOuting)
	 {
		 this.cFadeOutF++;
		 this.opacity = 255 - (255 * this.cFadeOutF / this.fadeOutF);
		 this.cFadeOutOfx = this.fadeOutOfx - (this.fadeOutOfx * this.cFadeInF / this.fadeInF);
		 
		 if(this.cFadeOutF >= this.fadeOutF)
		 {
			 this.cFadeOutF = 0;
			 this.fadeOuting = false;
			 this.opacity = 0;	
			 this.cFadeOutOfx = 0;
		 }
	 }
 }
 
 Sprite_ZzyVDraw.prototype.SetMotion = function(ActionID)
 {
	 this._actionID = ActionID;
	 this.ChangePicture(ActionID);
 }
 
 Sprite_ZzyVDraw.prototype.SetWait = function()//更新等待
 {
	 if(this.firstShow)
	 {
		 this.Appear();
		 this.firstShow = false;
	 }
	 this.SetMotion(Synrec.ZzyMC.ACTION_WAIT);
 
 }
 
 Sprite_ZzyVDraw.prototype.SetAttack = function()//攻击
 {
	 this.SetMotion(Synrec.ZzyMC.ACTION_ATTACK);
	 this._cActionFrame = 30;//动作时长
	 this._nextActionID = Synrec.ZzyMC.ACTION_WAIT;//下一次动作ID
 }
 
 Sprite_ZzyVDraw.prototype.SetInjured = function()//受伤
 {
	 this.SetMotion(Synrec.ZzyMC.ACTION_INJURED);
	 this._cActionFrame = 30;//动作时长
	 this._nextActionID = Synrec.ZzyMC.ACTION_WAIT;//下一次动作ID
	 
	 this.StartShake();//晃动
 }
 
 Sprite_ZzyVDraw.prototype.SetDeath = function()//死亡
 {
	 this.SetMotion(Synrec.ZzyMC.ACTION_DEATH);
	 this._cActionFrame = this.deathFrame;//动作时长
	 this._nextActionID = 0;
 
	 Synrec.ZzyMC.DeathSprite = this;
 }
 
 Sprite_ZzyVDraw.prototype.ChangePicture = function(ActionID)//切换位图
 {
	 this.bitmap = this.bitmapArr[ActionID];
 }
 
 Sprite_ZzyVDraw.prototype.Appear = function()//出现
 {
	 this.fadeIning = true;
	 this.cFadeInF = 0;
	 this.cFadeInOfx = 0;
	 
	 this.fadeOuting = false;
	 this.cFadeOutF = 0;
	 this.cFadeOutOfx = 0;
	 
	 this.opacity = 0;
 }
 
 Sprite_ZzyVDraw.prototype.DisAppear = function()//消失
 {
	 this.fadeOuting = true;
	 this.cFadeOutF = 0;
	 this.cFadeOutOfx = 0;
	 
	 this.fadeIning = false;
	 this.cFadeInF = 0;
	 this.cFadeInOfx = 0;
 }
 
 Sprite_ZzyVDraw.prototype.StartShake = function()//开始晃动
 {
	 this.shaking = true;
	 this.cShakeFrame = 0;
	 this.shakeDir = Math.floor(Math.random()*2);
	 this.shakeOfx = 0;
	 
 }
 
 //======================================================================
 //Window_PartyCommand
 //======================================================================
 Synrec.ZzyMC.Window_PartyCommand_setup = Window_PartyCommand.prototype.setup;
 Window_PartyCommand.prototype.setup = function() 
 {
	 Synrec.ZzyMC.Window_PartyCommand_setup.call(this);
	 Synrec.ZzyMC.ShowVDraw = true;
 };
 
 //======================================================================
 //Scene_Map
 //======================================================================
 Synrec.ZzyMC.Scene_Map_create = Scene_Map.prototype.create;
 Scene_Map.prototype.create = function()
 {
	 Synrec.ZzyMC.Scene_Map_create.call(this);
	 Synrec.ZzyMC.BitmapBuff = [];//初始化
 }
 
 
 
 
 
 
 
 
 
 
 //--------------------------------------Script-------------------------------------
 
 Synrec.ZzyMC.RequestBitmapArr = function(info)
 {
	 if(!Synrec.ZzyMC.TempBitmap[info.ActorId])
	 {
		 Synrec.ZzyMC.TempBitmap[info.ActorId] = [];
 
		 if(info.PicWait)Synrec.ZzyMC.TempBitmap[info.ActorId][Synrec.ZzyMC.ACTION_WAIT] = ImageManager.loadPicture(info.PicWait);
		 if(info.PicAttack)Synrec.ZzyMC.TempBitmap[info.ActorId][Synrec.ZzyMC.ACTION_ATTACK] = ImageManager.loadPicture(info.PicAttack);
		 if(info.PicInjured)Synrec.ZzyMC.TempBitmap[info.ActorId][Synrec.ZzyMC.ACTION_INJURED] = ImageManager.loadPicture(info.PicInjured);
		 if(info.PicDeath)Synrec.ZzyMC.TempBitmap[info.ActorId][Synrec.ZzyMC.ACTION_DEATH] = ImageManager.loadPicture(info.PicDeath);
	 }
	 return Synrec.ZzyMC.TempBitmap[info.ActorId];
 }
 
 Synrec.ZzyMC.GetActorInfo = function(actorId)
 {
	 var len = Synrec.ZzyMC.VDrawInfoArr.length;
	 for(var i=len-1;i>=0;i--)
	 {
		 var info = Synrec.ZzyMC.VDrawInfoArr[i];
		 if(info && info.ActorId === actorId)
		 {
			 return info;
		 }
	 }
	 return undefined;
 }
 
 