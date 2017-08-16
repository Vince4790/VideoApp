var $ = require('jquery');

module.exports = {
  setContacts: function(contacts){
    if ($.isArray(contacts)){
      return contacts;
    }
  },
  sortByNameAsc: function(a,b){
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  },
  sortByNameDesc: function(a,b){
    if (a.name > b.name) {
      return -1;
    } else if (a.name < b.name) {
      return 1;
    } else {
      return 0;
    }
  },
  filterContacts: function(contacts,searchText,sort){
    var filteredContacts = contacts;

    filteredContacts = filteredContacts.filter((contact) => {
      var nameLowerCase = contact.name.toLowerCase();
      var number = contact.number;
      return searchText.length === 0 || nameLowerCase.indexOf(searchText) > -1 || number.indexOf(searchText) > -1
              || contact.name.indexOf(searchText) > -1;
    });

    if (sort === 'SORT_NAME_ASC'){
      filteredContacts.sort(this.sortByNameAsc);

    } else if (sort === 'SORT_NAME_DESC'){
      filteredContacts.sort(this.sortByNameDesc);

    }

    return filteredContacts;
  }
};
