export interface RtnCommonType<T = any> {
  success: boolean; // 연결 테스트 결과
  message: string; // 메세지
  data?: T;
}
