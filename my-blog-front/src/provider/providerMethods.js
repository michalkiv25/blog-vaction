const ProviderMethods = {
  getData: {
      apiName: '/api/data',
      httpMethod: 'get',
  },
  contact : {
      apiName: '/api/contact',
      httpMethod: 'post',
  },
  getCountryDetails : {
      apiName: '/api/weatherCountry',
      httpMethod: 'post', 
  },
  getInformationCountries :{
      apiName: '/api/informationCountries',
      httpMethod: 'post',  
  }
};


export default ProviderMethods;