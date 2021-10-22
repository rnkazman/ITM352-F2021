date = 3;
month = 1;
year = 2001;

step1 = year / 100;
step2 = Math.floor(step1 / 4);
step3 = step2 + step1;
step4 = 5;
step6 = step4 + step3;
step7 = step6 + date;
step8 = step7 - 1;
step9 = step8 / 7;

// Day of the week number
var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";

// Ending step
console.log(`My birthday falls on a ${weekday[step9]}.`)