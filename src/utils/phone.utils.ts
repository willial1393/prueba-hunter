export class PhoneUtils {
  static normalize(phone: string): string {
    if (!phone.includes('+')) {
      return `+${phone.trim()}`;
    }
    return phone.trim();
  }
}
