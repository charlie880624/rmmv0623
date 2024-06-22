
/*:
* @plugindesc 彈出一個窗口，顯示您從事件中獲得的道具
  * @author galuodo
  *
  * @help 此插件沒有插件命令。
  *
  * 魔改作者:流逝的歲月
  * 魔改版本:v1.01
  *
  *
  * 更新歷史v1.01:新增音效參數以及調整
  * 更新歷史v1.00:優化相容性問題,新增更多選用參數
  *
  *
  *
  * @param ---設定---
  * @default
  *
  * @param Offset X
  * @text 偏移座標X
  * @parent ---設定---
  * @desc x座標的偏移值。
  * @default 0
  *
  * @param Offset Y
  * @text 偏移座標Y
  * @parent ---設定---
  * @desc y座標的偏移值。
  * @default 0
  *
  *
  *
  * @param AddFormat
  * @text 取得文字格式
  * @parent ---設定---
  * @type text
  * @desc 顯示取得的文字格式,%1會被替換為道具名稱,%2會被替換為道具數量
  * @default 獲得 ["%1"] x %2
  *
  * @param SubFormat
  * @text 失去文字格式
  * @parent ---設定---
  * @type text
  * @desc 顯示失去的文字格式,%1會被替換為道具名稱,%2會被替換為道具數量
  * @default 失去 ["%1"] x %2
  *
  *
  *
  *
  *
  * @param ---音效---
  * @default
  *
  * @param EarnSound
  * @text 取得道具名稱
  * @parent ---音效---
  * @type file
  * @dir audio/se
  * @desc 執行取得道具時,會播放的取得道具,BGM應放在audio/bgm資料夾中,不填寫會使用預設的播放音效
  * @default Sound1
  *
  * @param EarnVolume
  * @text 取得道具音量
  * @parent ---音效---
  * @type Number
  * @desc 音量大小,預設100
  * @default 100
 
  * @param EarnPitch
  * @text 取得道具聲調
  * @parent ---音效---
  * @type Number
  * @desc 音調,預設100
  * @default 100
 
  * @param EarnBGSPan
  * @text 取得道具聲道
  * @parent ---音效---
  * @type Number
  * @desc 聲道,預設0
  * @default 0
  *
  *
  * @param LostSound
  * @text 失去道具名稱
  * @parent ---音效---
  * @type file
  * @dir audio/se
  * @desc 執行失去道具時,會播放的失去道具,BGM應放在audio/bgm資料夾中,不填寫會使用預設的失去道具音效
  * @default Stare
  *
  * @param LostVolume
  * @text 失去道具音量
  * @parent ---音效---
  * @type Number
  * @desc 音量大小,預設100
  * @default 100
 
  * @param LostPitch
  * @text 失去道具聲調
  * @parent ---音效---
  * @type Number
  * @desc 音調,預設100
  * @default 100
 
  * @param LostBGSPan
  * @text 失去道具聲道
  * @parent ---音效---
  * @type Number
  * @desc 聲道,預設0
  * @default 0
 
 *
 *
 *
 * 
 *
 *
 */
 
 
 
var parameters = PluginManager.parameters('GainItem');
Scene_GainItem.prototype._currItem;
Scene_GainItem.prototype._currNum;//数量




var Zzy = Zzy || {};
Zzy.MagicChange = Zzy.MagicChange || {};
Zzy.MagicChange.GIF = {};
Zzy.MagicChange.GIF.AddFormat = String(parameters['AddFormat']);
Zzy.MagicChange.GIF.SubFormat = String(parameters['SubFormat']);



Zzy.MagicChange.GIF.offsetX = Number(parameters['Offset X'] || 0);
Zzy.MagicChange.GIF.offsetY = Number(parameters['Offset Y'] || 0);


 
 //--------------------------------------声音-------------------------------------

Zzy.MagicChange.GIF.MakeSE = function(seName,seVolume,sePitch,sePan)
{
	if(!seName)return undefined;
	var se = {
		name:seName,
		volume:(seVolume ? seVolume : 100),
		pitch:(sePitch ? sePitch : 100),
		pan:(sePan ? sePan : 0)
	};
	return se;
}



Zzy.MagicChange.GIF.EarnSound = String(parameters['EarnSound']);//背景BGM名称
Zzy.MagicChange.GIF.EarnVolume = parseInt(parameters['EarnVolume']);//背景BGM音量
Zzy.MagicChange.GIF.EarnPitch = parseInt(parameters['EarnPitch']);//背景BGM声调
Zzy.MagicChange.GIF.EarnBGSPan = parseInt(parameters['EarnPan']);//背景BGM声道
Zzy.MagicChange.GIF.EarnSE = Zzy.MagicChange.GIF.MakeSE(Zzy.MagicChange.GIF.EarnSound,Zzy.MagicChange.GIF.EarnVolume,Zzy.MagicChange.GIF.EarnPitch,Zzy.MagicChange.GIF.EarnBGSPan);

Zzy.MagicChange.GIF.LostSound = String(parameters['LostSound']);//背景BGM名称
Zzy.MagicChange.GIF.LostVolume = parseInt(parameters['LostVolume']);//背景BGM音量
Zzy.MagicChange.GIF.LostPitch = parseInt(parameters['LostPitch']);//背景BGM声调
Zzy.MagicChange.GIF.LostBGSPan = parseInt(parameters['LostPan']);//背景BGM声道
Zzy.MagicChange.GIF.LostSE = Zzy.MagicChange.GIF.MakeSE(Zzy.MagicChange.GIF.LostSound,Zzy.MagicChange.GIF.LostVolume,Zzy.MagicChange.GIF.LostPitch,Zzy.MagicChange.GIF.LostBGSPan);



Zzy.MagicChange.GIF.AllSE = [];
Zzy.MagicChange.GIF.AllSE = [undefined,
		Zzy.MagicChange.GIF.EarnSE,Zzy.MagicChange.GIF.LostSE
		];

 
 



Zzy.MagicChange.GIF.Game_Interpreter_command126 = Game_Interpreter.prototype.command126;
Game_Interpreter.prototype.command126 = function () 
{
	var result = Zzy.MagicChange.GIF.Game_Interpreter_command126.call(this);
	
	var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
    Scene_GainItem._currItem = $dataItems[this._params[0]];
	Scene_GainItem._currNum = value;	
	if(Scene_GainItem._currNum >= 0)
	{Zzy.MagicChange.GIF.PlaySE(1);}
	else
	{Zzy.MagicChange.GIF.PlaySE(2);}
	
	SceneManager.push(Scene_GainItem);
	return result;
};







function Scene_GainItem() {
    this.initialize.apply(this, arguments);
}

Scene_GainItem.prototype = Object.create(Scene_MenuBase.prototype);
Scene_GainItem.prototype.constructor = Scene_GainItem;

Scene_GainItem.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_GainItem.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createMissionWindow(Scene_GainItem.itemName);
};

Scene_GainItem.prototype.start = function () {
    Scene_MenuBase.prototype.start.call(this);

};

Scene_GainItem.prototype.update = function () {
    var active = this.isActive();
    $gameTimer.update(active);
    $gameScreen.update();
    if (Input.isTriggered('ok') || Input.isTriggered('cancel') || TouchInput.isTriggered()) {
        SceneManager.pop();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function GainObjectPopup() {
    this.initialize.apply(this, arguments);
}

GainObjectPopup.prototype = Object.create(Window_Base.prototype);
GainObjectPopup.prototype.constructor = GainObjectPopup;

GainObjectPopup.prototype.initialize = function (x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

GainObjectPopup.prototype.windowWidth = function () {
    return 480;
};

GainObjectPopup.prototype.windowHeight = function () {
    return this.fittingHeight(1);
};

GainObjectPopup.prototype.refresh = function () {
    var x = this.textPadding();
    this.contents.clear();
    //this.drawTextEx(this.value(), 48, 0);
	
	var text = this.value();
	var textW = this.textWidth(text);
	var startPosX = this.windowWidth()/2-textW/2-16;//其实位置
	
	if(startPosX <= 0)
	{
		this.drawText(text,32,0,this.windowWidth()-32,'center');
		this.drawIcon(Scene_GainItem._currItem.iconIndex, 0, 2);
	}
	else
	{
		//计算图标位置
		this.drawText(text,startPosX+32,0,this.windowWidth()-(startPosX+32),'left');
		this.drawIcon(Scene_GainItem._currItem.iconIndex, startPosX-2, 2);		
	}
	
	

	
};

GainObjectPopup.prototype.value = function () 
{
	var formatStr = undefined;
	if(Scene_GainItem._currNum >= 0)
	{formatStr = Zzy.MagicChange.GIF.AddFormat;}
	else
	{formatStr = Zzy.MagicChange.GIF.SubFormat;}
	
	var num = Math.abs(Scene_GainItem._currNum);
	
	var str = formatStr.format(Scene_GainItem._currItem.name,num);
    return str;
};



GainObjectPopup.prototype.open = function () {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

Scene_GainItem.prototype.createMissionWindow = function (item) {
    this._currItem = item;
    this._missionWindow = new GainObjectPopup(0, 200);
    this._missionWindow.y = (Graphics.boxHeight - this._missionWindow.height) / 2 + Zzy.MagicChange.GIF.offsetY;
    this._missionWindow.x = (Graphics.boxWidth - this._missionWindow.width) / 2 + Zzy.MagicChange.GIF.offsetX;
    this.addWindow(this._missionWindow);

}

Zzy.MagicChange.GIF.PlaySE = function(soundID)//播放声音
{
	var se = Zzy.MagicChange.GIF.AllSE[soundID];
	
	if(se && se.name)
	{
		AudioManager.playSe(se);
	}
}


