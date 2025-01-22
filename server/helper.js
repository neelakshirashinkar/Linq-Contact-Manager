const exportedMethods = {
    stringCheck(str,Varname){
      if (!str) throw 'You must provide a str for your movie';
      if (typeof str !== 'string') throw `${Varname} must be a string`;
      if (str.trim().length === 0)
        throw `${Varname} cannot be an empty string or just spaces`;
      if (!isNaN(str))
        throw `${str} is not a valid value for ${Varname} as it only contains digits`;
      if (/^[^a-zA-Z0-9\s]+$/.test(str)) {
          throw `${str} is not a valid value for ${Varname} as it only contains special characters or punctuation marks`;
      }
      
      return str;
    },
  
    emailCheck(email) {
      if (!email) throw 'You must provide an email address';
      if (typeof email !== 'string') throw 'Email must be a string';
      if (!/^\S+@\S+\.\S+$/.test(email)) throw 'Invalid email format';
      return email;
    },
};
export default exportedMethods;