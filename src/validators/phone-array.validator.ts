import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneUtils } from '../utils/phone.utils';

@ValidatorConstraint({ name: 'phone-array', async: false })
export class PhoneArrayConstraint implements ValidatorConstraintInterface {
  validate(value?: string[]) {
    try {
      if (!value) return false;
      value = value.map((phone) => {
        if (!phone.includes('+')) {
          return `+${phone.trim()}`;
        }
        return PhoneUtils.normalize(phone);
      });
      const phoneUtil = PhoneNumberUtil.getInstance();
      return value.every((phone) => {
        const phoneNum = phoneUtil.parse(phone);
        return phoneUtil.isValidNumber(phoneNum);
      });
    } catch (e) {
      return false;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} must be a valid array phone number`;
  }
}

export function IsPhoneArray(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isPhoneArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PhoneArrayConstraint,
    });
  };
}
