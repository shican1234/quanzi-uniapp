/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 身份证号
 * @param {*} s
 */
// export function isID (s) {
//   return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(s)
// }
export function isID(id) {
     // 1 "验证通过!", 0 //校验不通过
        var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
        //号码规则校验
        if(!format.test(id)){
            return false;
        }
        //区位码校验
        //出生年月日校验   前正则限制起始年份为1900;
        var year = id.substr(6,4),//身份证年
            month = id.substr(10,2),//身份证月
            date = id.substr(12,2),//身份证日
            time = Date.parse(month+'-'+date+'-'+year),//身份证日期时间戳date
            now_time = Date.parse(new Date()),//当前时间戳
            dates = (new Date(year,month,0)).getDate();//身份证当月天数
        if(time>now_time||date>dates){
			return false;
            //return {'status':0,'msg':'出生日期不合规'}
        }
        //校验码判断
        var c = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);   //系数
        var b = new Array('1','0','X','9','8','7','6','5','4','3','2');  //校验码对照表
        var id_array = id.split("");
        var sum = 0;
        for(var k=0;k<17;k++){
            sum+=parseInt(id_array[k])*parseInt(c[k]);
        }
        if(id_array[17].toUpperCase() != b[sum%11].toUpperCase()){
			return false;
            //return {'status':0,'msg':'身份证校验码不合规'}
        }
        return true;
}

/**
 * 身份证号计算年龄 性别  出生日期
 * @param {*} s
 */
export function IdCard(UUserCard){
  let briday = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);//出生日期
  console.log(briday);
  let sex = '';//性别
  if(parseInt(UUserCard.substr(16, 1)) % 2 == 1){
    sex = 2
  }else{
    sex = 1
  }
  let myDate = new Date();
  let month = myDate.getMonth() + 1;
  let day = myDate.getDate();
  let age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
  if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
    age++;
  }
  let ob = {
    briday:briday,
    sex:sex,
    age:age
  }
  return ob;
}

 export function formatTen(num) {
      return num > 9 ? (num + "") : ("0" + num);
  }

//标准时间转年月日---
export function TimeYY(date){
   var year = date.getFullYear();
   var month = date.getMonth() + 1;
   var day = date.getDate();
   var hour = date.getHours();
   var minute = date.getMinutes();
   var second = date.getSeconds();
   return year + "-" + formatTen(month) + "-" + formatTen(day) + " " + formatTen(hour) + ":" + formatTen(minute) + ":" + formatTen(second);
}

export function TimeYYdAY(date){
   var year = date.getFullYear();
   var month = date.getMonth() + 1;
   var day = date.getDate();
   var hour = date.getHours();
   var minute = date.getMinutes();
   var second = date.getSeconds();
   
   	var weekArray = new Array("日","一", "二", "三", "四", "五", "六");
   	var week  = weekArray[new Date(date).getDay()];
	let data = {
		year:year,
		month:formatTen(month),
		day:formatTen(day),
		week:week
	}
	return data;
}
//倒计时
export function daojishi(endTime, startTime){
	let date = endTime - startTime; //时间差  
	let mmsec = date % 1000 //所余毫秒数  
	let seconds = Math.floor(date / 1000 % 60); //所余秒数  
	let minutes = Math.floor(date / 1000 / 60 % 60); //所余分钟数  
	let hour = Math.floor(date / 1000 / 60 / 60 % 24); //所余时钟数  
	let day = Math.floor(date / 1000 / 60 / 60 / 24); //天数  
	return {
				day: day
				, hour: hour
				, minutes: minutes
				, seconds: seconds
				, mmsec: mmsec
			}
}
//计算后多少分钟之后的时间
export function addMinutes(date,minutes)  {   
          minutes=parseInt(minutes);  
          var interTimes=minutes*60*1000;
          interTimes=parseInt(interTimes);  
          return  new Date(Date.parse(date)+interTimes);  
  }

//标准时间转年月日
export function TimeDate(date){
   var year = date.getFullYear();
   var month = date.getMonth() + 1;
   var day = date.getDate();
   var hour = date.getHours();
   var minute = date.getMinutes();
   var second = date.getSeconds();
   return year.toString().substr(2, 2) + formatTen(month);
}

//获取日期的前十天
export function GetDateStr(AddDayCount){
  var dd = new Date();
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
  var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
  return y+"-"+m+"-"+d;
}

//时间戳转时间
// 时间戳转换成时间
export function timestampToTime (cjsj) {
	var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
	var D = (date.getDate()<10?'0' + date.getDate():date.getDate()) + ' '
	var h = date.getHours() + ':'
	var m = date.getMinutes() + ':'
	var s = date.getSeconds()
	return Y+M+D+h+m+s
}

export function timestampToTimes (cjsj) {
	var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
	var D = (date.getDate()<10?'0' + date.getDate():date.getDate()) + ' '
	var h = (date.getHours()<10?'0' + date.getHours():date.getHours()) + ':'
	var m = (date.getMinutes()<10?'0' + date.getMinutes():date.getMinutes())
	return Y+M+D+h+m
}