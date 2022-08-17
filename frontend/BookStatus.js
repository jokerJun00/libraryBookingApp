exports.getValue = (array, key) => {
    return array.filter (o => o.key === key)[0].value;
  };
  exports.status = [
    {key: '01', value: 'Available'},
    {key: '02', value: 'Not Available'},
  ];