// 地图工具函数 - 可在服务端和客户端共享

// 埃及主要城市坐标
export const EGYPT_CITIES: Record<string, [number, number]> = {
  '开罗': [31.2357, 30.0444],
  '吉萨': [31.2109, 29.9870],
  '马特鲁': [27.2333, 31.3500],
  '卢克索': [32.6396, 25.6872],
  '赫尔格达': [33.8116, 27.2579],
  '阿斯旺': [32.8998, 24.0889],
  '亚历山大': [29.9187, 31.2001],
};

// 获取城市坐标
export function getCityCoordinates(cityName: string): [number, number] | undefined {
  return EGYPT_CITIES[cityName];
}

// 解析地点字符串获取坐标
export function parseLocationCoordinates(location: string): Array<{name: string; coords: [number, number]}> {
  const cities: Array<{name: string; coords: [number, number]}> = [];
  
  Object.keys(EGYPT_CITIES).forEach(cityName => {
    if (location.includes(cityName)) {
      cities.push({
        name: cityName,
        coords: EGYPT_CITIES[cityName]
      });
    }
  });
  
  return cities;
}
