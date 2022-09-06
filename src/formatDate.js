import moment from 'moment-timezone';


export const formatDate = (date, skipOneDay = false, isUnixTimeStamp = true) =>{
  const skipOneDayOrNo = skipOneDay ? date + (86400 * 1000) : date;
  let getDay;
  let getHoursAndMinutes
  
  if(isUnixTimeStamp){
    
    getDay = moment.unix(date).format('dddd')
    getHoursAndMinutes = moment.unix(date).format('LT')

  } else{
    getDay = moment(skipOneDayOrNo).format('dddd')
    getHoursAndMinutes =  moment(skipOneDayOrNo).format('LT')

  }
  
  return {day: getDay, time: getHoursAndMinutes}
}


