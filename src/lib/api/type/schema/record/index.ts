import BaseSchema from '@/lib/api/type/schema/common/base-schema';
import User from '@/lib/api/type/schema/user';

export default interface Record extends BaseSchema {
  user: User;
  name: string;
  type: RRType;
  ttl: number;
  record: string[];
}

export enum RRType {
  A = 'A',
  AAAA = 'AAAA',
  CNAME = 'CNAME',
  MX = 'MX',
  TXT = 'TXT',
  PTR = 'PTR',
  SRV = 'SRV',
  SPF = 'SPF',
  NAPTR = 'NAPTR',
  CAA = 'CAA',
  NS = 'NS',
  DS = 'DS',
  TLSA = 'TLSA',
  SSHFP = 'SSHFP',
  HTTPS = 'HTTPS',
  SVCB = 'SVCB',
}

export function getDescription(type: RRType) {
  if (type === RRType.A) return 'IPv4 주소를 가리키는 레코드';
  if (type === RRType.AAAA) return 'IPv6 주소를 가리키는 레코드';
  if (type === RRType.CNAME) return '도메인을 다른 도메인으로 매핑하는 레코드';
  if (type === RRType.MX) return '메일 서버를 지정하는 레코드';
  if (type === RRType.TXT) return '텍스트 데이터를 저장하는 레코드';
  if (type === RRType.PTR) return 'IP 주소를 도메인 이름으로 매핑하는 역방향 레코드';
  if (type === RRType.SRV) return '특정 서비스를 제공하는 서버의 위치를 지정하는 레코드';
  if (type === RRType.SPF) return '메일 발신자를 인증하기 위한 레코드';
  if (type === RRType.NAPTR) return '정규 표현식을 이용해 서비스와 프로토콜을 정의하는 레코드';
  if (type === RRType.CAA) return '도메인에서 허용된 인증 기관(CA)을 지정하는 레코드';
  if (type === RRType.NS) return '도메인을 관리하는 네임서버를 지정하는 레코드';
  if (type === RRType.DS) return 'DNSSEC 서명을 위한 정보가 포함된 레코드';
  if (type === RRType.TLSA) return 'TLS 인증서를 검증하는 데 사용되는 레코드';
  if (type === RRType.SSHFP) return 'SSH 공개 키 지문을 저장하는 레코드';
  if (type === RRType.HTTPS) return 'HTTPS 서비스를 위한 보안 향상된 레코드';
  if (type === RRType.SVCB) return '서비스를 위한 추가적인 메타데이터를 제공하는 레코드';
}

export function getPlaceholder(type: RRType) {
  if (type === RRType.A) return '192.0.2.235';
  if (type === RRType.AAAA) return '2001:0db8::8a2e:0370:bab5';
  if (type === RRType.CNAME) return 'www.example.com';
  if (type === RRType.MX) return '10 mailserver.example.com';
  if (type === RRType.TXT) return '샘플 텍스트 항목';
  if (type === RRType.PTR) return 'www.example.com';
  if (type === RRType.SRV) return '1 10 5269 xmpp-server.example.com';
  if (type === RRType.SPF) return 'v=spf1 ip4:192.168.0.1/16-all';
  if (type === RRType.NAPTR) return '10 100 "s" "SIP+D2U" "" foo.example.com';
  if (type === RRType.CAA) return '0 issue "caa.example.com"';
  if (type === RRType.NS) return 'ns1.example.com';
  if (type === RRType.DS) return '12345 3 1 0123456789abcdef';
  if (type === RRType.TLSA) return '0 0 1 d2abde240d7cd3ee6b4b28c';
  if (type === RRType.SSHFP) return '1 1 09F6A01D2175742B257';
  if (type === RRType.HTTPS) return '16 test.example.org(선택적 키 값 쌍, 예: 포트=8000)';
  if (type === RRType.SVCB) return '16 test.example.org(선택적 키 값 쌍, 예: 포트=8000)';
}

export function getFormat(type: RRType) {
  if (type === RRType.MX) return '[priority] [mail server host name]';
  if (type === RRType.SRV) return '[priority] [weight] [port] [server host name]';
  if (type === RRType.CAA) return '[flag] [tag] [value]';
  if (type === RRType.DS) return '[key tag] [algorithm] [digest type] [digest]';
  if (type === RRType.NAPTR)
    return '[order] [preference] [flags] [services] [regexp] [replacement]';
}
