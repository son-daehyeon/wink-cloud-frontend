export const formatMemory = (value: number) =>
  value === 0 ? '없음' : value >= 1024 ? `${value / 1024}GB` : `${value}MB`;
