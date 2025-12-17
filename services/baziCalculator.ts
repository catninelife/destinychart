import { Lunar } from 'lunar-javascript';
import { UserInput, BaZiResult, BaZiChart, Gender } from '../types';

// 城市经度映射（用于真太阳时计算）
const CITY_LONGITUDE: Record<string, number> = {
  // 中国主要城市
  '北京': 116.4,
  'beijing': 116.4,
  '上海': 121.5,
  'shanghai': 121.5,
  '广州': 113.3,
  'guangzhou': 113.3,
  '深圳': 114.1,
  'shenzhen': 114.1,
  '杭州': 120.2,
  'hangzhou': 120.2,
  '成都': 104.1,
  'chengdu': 104.1,
  '重庆': 106.5,
  'chongqing': 106.5,
  '武汉': 114.3,
  'wuhan': 114.3,
  '西安': 108.9,
  'xian': 108.9,
  '南京': 118.8,
  'nanjing': 118.8,
  '天津': 117.2,
  'tianjin': 117.2,
  '苏州': 120.6,
  'suzhou': 120.6,
  '长沙': 113.0,
  'changsha': 113.0,
  '郑州': 113.7,
  'zhengzhou': 113.7,
  '沈阳': 123.4,
  'shenyang': 123.4,
  '青岛': 120.4,
  'qingdao': 120.4,
  '大连': 121.6,
  'dalian': 121.6,
  '济南': 117.0,
  'jinan': 117.0,
  '厦门': 118.1,
  'xiamen': 118.1,
  '福州': 119.3,
  'fuzhou': 119.3,
  '哈尔滨': 126.6,
  'harbin': 126.6,
  '长春': 125.3,
  'changchun': 125.3,
  '昆明': 102.7,
  'kunming': 102.7,
  '贵阳': 106.7,
  'guiyang': 106.7,
  '南宁': 108.3,
  'nanning': 108.3,
  '海口': 110.3,
  'haikou': 110.3,
  '台北': 121.5,
  'taipei': 121.5,
  '香港': 114.2,
  'hong kong': 114.2,
  'hongkong': 114.2,
  '澳门': 113.5,
  'macau': 113.5,
  'macao': 113.5,
  // 国际城市
  'new york': -74.0,
  'newyork': -74.0,
  '纽约': -74.0,
  'los angeles': -118.2,
  'losangeles': -118.2,
  '洛杉矶': -118.2,
  'london': -0.1,
  '伦敦': -0.1,
  'tokyo': 139.7,
  '东京': 139.7,
  'seoul': 127.0,
  '首尔': 127.0,
  'singapore': 103.8,
  '新加坡': 103.8,
  'sydney': 151.2,
  '悉尼': 151.2,
  'paris': 2.3,
  '巴黎': 2.3,
  'berlin': 13.4,
  '柏林': 13.4,
  'moscow': 37.6,
  '莫斯科': 37.6,
  'dubai': 55.3,
  '迪拜': 55.3,
  'vancouver': -123.1,
  '温哥华': -123.1,
  'toronto': -79.4,
  '多伦多': -79.4,
  'san francisco': -122.4,
  'sanfrancisco': -122.4,
  '旧金山': -122.4,
};

// 获取城市经度
function getCityLongitude(location: string): number {
  const normalizedLocation = location.toLowerCase().replace(/\s+/g, '');

  for (const [city, longitude] of Object.entries(CITY_LONGITUDE)) {
    if (normalizedLocation.includes(city.toLowerCase().replace(/\s+/g, ''))) {
      return longitude;
    }
  }

  // 默认使用北京经度（东八区标准）
  return 116.4;
}

// 计算真太阳时
function calculateTrueSolarTime(
  birthDate: string,
  birthTime: string,
  location: string
): { solarTime: string; adjustedDate: Date } {
  const [year, month, day] = birthDate.split('-').map(Number);
  const [hour, minute] = birthTime.split(':').map(Number);

  const longitude = getCityLongitude(location);

  // 经度时差：每15度为1小时，东八区标准经度为120度
  const standardLongitude = 120; // 东八区
  const longitudeDiff = (longitude - standardLongitude) * 4; // 分钟

  // 真太阳时 = 地方平太阳时 + 时差方程（简化处理，忽略时差方程）
  let totalMinutes = hour * 60 + minute + longitudeDiff;

  // 处理日期跨越
  let adjustedDay = day;
  let adjustedMonth = month;
  let adjustedYear = year;

  if (totalMinutes < 0) {
    totalMinutes += 24 * 60;
    adjustedDay -= 1;
    if (adjustedDay < 1) {
      adjustedMonth -= 1;
      if (adjustedMonth < 1) {
        adjustedMonth = 12;
        adjustedYear -= 1;
      }
      // 简化处理，获取上个月天数
      const daysInPrevMonth = new Date(adjustedYear, adjustedMonth, 0).getDate();
      adjustedDay = daysInPrevMonth;
    }
  } else if (totalMinutes >= 24 * 60) {
    totalMinutes -= 24 * 60;
    adjustedDay += 1;
    const daysInMonth = new Date(adjustedYear, adjustedMonth, 0).getDate();
    if (adjustedDay > daysInMonth) {
      adjustedDay = 1;
      adjustedMonth += 1;
      if (adjustedMonth > 12) {
        adjustedMonth = 1;
        adjustedYear += 1;
      }
    }
  }

  const solarHour = Math.floor(totalMinutes / 60);
  const solarMinute = Math.round(totalMinutes % 60);

  const solarTime = `${solarHour.toString().padStart(2, '0')}:${solarMinute.toString().padStart(2, '0')}`;
  const adjustedDate = new Date(adjustedYear, adjustedMonth - 1, adjustedDay, solarHour, solarMinute);

  return { solarTime, adjustedDate };
}

// 使用 lunar-javascript 计算八字
export function calculateBaZiLocal(input: UserInput): BaZiResult {
  const { solarTime, adjustedDate } = calculateTrueSolarTime(
    input.birthDate,
    input.birthTime,
    input.birthLocation
  );

  // 使用 lunar-javascript 库 - 直接使用 Lunar.fromDate
  const lunar = Lunar.fromDate(adjustedDate);
  const eightChar = lunar.getEightChar();

  // 获取八字四柱
  const bazi: BaZiChart = {
    year: {
      gan: eightChar.getYearGan(),
      zhi: eightChar.getYearZhi()
    },
    month: {
      gan: eightChar.getMonthGan(),
      zhi: eightChar.getMonthZhi()
    },
    day: {
      gan: eightChar.getDayGan(),
      zhi: eightChar.getDayZhi()
    },
    hour: {
      gan: eightChar.getTimeGan(),
      zhi: eightChar.getTimeZhi()
    }
  };

  // 获取农历日期
  const lunarYear = lunar.getYearInChinese();
  const lunarMonth = lunar.getMonthInChinese();
  const lunarDay = lunar.getDayInChinese();
  const isLeapMonth = lunar.getMonth() < 0; // 负数表示闰月
  const lunarDate = `${lunarYear}年${isLeapMonth ? '闰' : ''}${lunarMonth}月${lunarDay}`;

  // 计算大运
  const isMale = input.gender === Gender.MALE;
  const yun = eightChar.getYun(isMale ? 1 : 0);

  // 起运岁数
  const startAge = yun.getStartYear();

  // 大运方向（顺行/逆行）
  const direction = yun.isForward() ? 'Forward' : 'Backward';

  // 获取大运列表（取前10个大运）
  const daYunList = yun.getDaYun();
  const daYun: string[] = [];

  for (let i = 1; i < Math.min(daYunList.length, 11); i++) {
    const dy = daYunList[i];
    daYun.push(dy.getGanZhi());
  }

  return {
    userInput: input,
    solarTime,
    lunarDate,
    bazi,
    startAge,
    direction,
    daYun
  };
}
