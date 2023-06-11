import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneUtils } from '../utils/phone.utils';

@ValidatorConstraint({ name: 'phone', async: false })
export class PhoneConstraint implements ValidatorConstraintInterface {
  validate(value?: string) {
    try {
      if (!value) return false;
      value = PhoneUtils.normalize(value);
      const phoneUtil = PhoneNumberUtil.getInstance();
      const phone = phoneUtil.parse(value);
      return phoneUtil.isValidNumber(phone);
    } catch (e) {
      return false;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} must be a valid phone number`;
  }
}

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isPhone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PhoneConstraint,
    });
  };
}
