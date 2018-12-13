import {ROLL_TALENTS, DISTINGUISHING_MARKS, STAR_SIGN, PROVINCE, TYPE_OF_SETTLEMENT, DWARF_BIRTH_PLACE, ELF_BIRTH_PLACE} from './constants';

export class StaticMethods {
  // DICE ROLLS
  static rollK10(): number {
    return Math.floor(Math.random() * 10) + 1;
  }
  static rollK20(): number {
    return Math.floor(Math.random() * 20) + 1;
  }
  static rollK100(): number {
    return Math.floor(Math.random() * 100) + 1;
  }
  // TABLE 2-4
  static rollTalent(race: string): string {
    const roll = this.rollK100();
    if (race === 'Człowiek') {
      if (roll < 5) {
        return ROLL_TALENTS[0];
      } else if (roll < 10) {
        return ROLL_TALENTS[1];
      } else if (roll < 14) {
        return ROLL_TALENTS[2];
      } else if (roll < 19) {
        return ROLL_TALENTS[3];
      } else if (roll < 23) {
        return ROLL_TALENTS[4];
      } else if (roll < 28) {
        return ROLL_TALENTS[5];
      } else if (roll < 32) {
        return ROLL_TALENTS[6];
      } else if (roll < 36) {
        return ROLL_TALENTS[7];
      } else if (roll < 41) {
        return ROLL_TALENTS[8];
      } else if (roll < 45) {
        return ROLL_TALENTS[9];
      } else if (roll < 50) {
        return ROLL_TALENTS[10];
      } else if (roll < 54) {
        return ROLL_TALENTS[11];
      } else if (roll < 58) {
        return ROLL_TALENTS[12];
      } else if (roll < 62) {
        return ROLL_TALENTS[13];
      } else if (roll < 67) {
        return ROLL_TALENTS[14];
      } else if (roll < 72) {
        return ROLL_TALENTS[15];
      } else if (roll < 76) {
        return ROLL_TALENTS[16];
      } else if (roll < 80) {
        return ROLL_TALENTS[17];
      } else if (roll < 84) {
        return ROLL_TALENTS[18];
      } else if (roll < 88) {
        return ROLL_TALENTS[19];
      } else if (roll < 92) {
        return ROLL_TALENTS[20];
      } else if (roll < 96) {
        return ROLL_TALENTS[21];
      } else {
        return ROLL_TALENTS[22];
      }
    } else {
      if (roll < 5) {
        return ROLL_TALENTS[0];
      } else if (roll < 10) {
        return ROLL_TALENTS[1];
      } else if (roll < 14) {
        return ROLL_TALENTS[2];
      } else if (roll < 19) {
        return ROLL_TALENTS[3];
      } else if (roll < 24) {
        return ROLL_TALENTS[4];
      } else if (roll < 29) {
        return ROLL_TALENTS[5];
      } else if (roll < 35) {
        return ROLL_TALENTS[6];
      } else if (roll < 40) {
        return ROLL_TALENTS[7];
      } else if (roll < 45) {
        return ROLL_TALENTS[8];
      } else if (roll < 50) {
        return ROLL_TALENTS[9];
      } else if (roll < 54) {
        return ROLL_TALENTS[10];
      } else if (roll < 59) {
        return ROLL_TALENTS[11];
      } else if (roll < 63) {
        return ROLL_TALENTS[12];
      } else if (roll < 65) {
        return ROLL_TALENTS[13];
      } else if (roll < 69) {
        return ROLL_TALENTS[14];
      } else if (roll < 74) {
        return ROLL_TALENTS[15];
      } else if (roll < 79) {
        return ROLL_TALENTS[16];
      } else if (roll < 83) {
        return ROLL_TALENTS[17];
      } else if (roll < 88) {
        return ROLL_TALENTS[18];
      } else if (roll < 93) {
        return ROLL_TALENTS[19];
      } else if (roll < 97) {
        return ROLL_TALENTS[20];
      } else {
        return ROLL_TALENTS[21];
      }
    }
  }
  // PERSONAL DETAILS TABLES
  // TABLE 2-7
  static rollWeight(): number {
    const roll = this.rollK100();
    return roll === 1 ? 0 : roll === 100 ? 11 : Math.ceil(roll / 10);
  }
  // TABLE 2-10
  static rollDistinguishingMarks(): string {
    const roll = this.rollK100();
    if (roll > 98) {
      return DISTINGUISHING_MARKS[20];
    } else if (roll > 94) {
      return DISTINGUISHING_MARKS[19];
    } else if (roll > 89) {
      return DISTINGUISHING_MARKS[18];
    } else if (roll > 84) {
      return DISTINGUISHING_MARKS[17];
    } else {
      return DISTINGUISHING_MARKS[Math.ceil(roll / 5) - 1];
    }
  }
  // TABLE 2-11
  static rollNumberOfSiblings(): number {
    const roll = this.rollK10();
    return roll === 1 ? 0 : roll === 10 ? 5 : Math.floor(roll / 2);
  }
  // TABLE 2-12
  static rollStarSign(): string {
    const roll = this.rollK100();
    return roll === 100 ? STAR_SIGN[19] : 15 < roll && roll < 26 ? STAR_SIGN[3] : STAR_SIGN[Math.ceil(roll / 5) - 1];
  }
  static yearWord (x: number): string {
    if (x === 1) {
      return x + ' rok';
    } else if ((x % 10 === 2) || (x % 10 === 3) || (x % 10 === 4)) {
      return  x + ' lata';
    } else {
      return x + ' lat' ;
    }
  }
  // TABLE 2-14
  static rollHumanBirthPlace(): string {
    return PROVINCE[this.rollK10() - 1] + ' - ' + TYPE_OF_SETTLEMENT[this.rollK10() - 1];
  }
  // TABLE 2-15
  static rollDwarfBirthPlace(): string {
    const roll = StaticMethods.rollK10() - 1;
    return roll < 3 ? this.rollHumanBirthPlace() : DWARF_BIRTH_PLACE[roll - 3];
  }
  // TABLE 2-16
  static rollElfBirthPlace(): string {
    const roll = StaticMethods.rollK100();
    if (roll < 21) {
      return ELF_BIRTH_PLACE[0];
    } else if (roll < 41) {
      return ELF_BIRTH_PLACE[1];
    } else if (roll < 71) {
      return ELF_BIRTH_PLACE[2];
    } else if (roll < 86) {
      return ELF_BIRTH_PLACE[3];
    } else {
      return ELF_BIRTH_PLACE[4];
    }
  }
  // TABLE 2-17
  static rollHalflingBirthPlace(): string {
    return Math.random() > 0.5 ? 'Kraina Zgromadzenia' : this.rollHumanBirthPlace();
  }
}
