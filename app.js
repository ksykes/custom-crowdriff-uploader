function showError(text) {
  $("#error-text").html(text);
  $("#error-modal").addClass("is-active");
}

function hideErrorModal() {
  $("#error-modal").removeClass("is-active");
}

function showThankYouPanel(text) {
  $("#form-panel").hide();
  $("#thank-you-panel-message").html(text);
  $("#thank-you-panel").show();
}

function getFormValues() {
  return {
    name: $("#input-name").val(),
    email: $("#input-email").val(),
    phone: $("#input-phone").val(),
    category: $("input[name=category]:checked").val(),
    instagram: $("#input-instagram").val(),
    facebook: $("#input-facebook").val(),
    twitter: $("#input-twitter").val(),
    terms: $("#input-terms").prop('checked') ?  true : false,
    age: $("#input-age").prop('checked') ? true : false,
    resident: $("#input-resident").prop('checked') ? true : false,
    mailing: $("#input-mailing").prop('checked') ? true : false
  }
}

function validateForm() {
  var values = getFormValues();
  if (!values.name) {
    showError('Name is a required field.');
    return false;
  }

  if (!values.email) {
    showError('Email is a required field.');
    return false;
  }

  if (!values.phone) {
    showError('Phone Number is a required field.');
    return false;
  }

  if (!values.category) {
    showError('Please pick a category for your entry.');
    return false;
  }

  if (!values.terms) {
    showError('You must accept the terms and conditions to be eligible.');
    return false;
  }

  if (!values.age) {
    showError('You must be at least 19 years of age to be eligible.');
    return false;
  }

  if (!values.resident) {
    showError('You must be a resident of Ontario to be eligible.');
    return false;
  }

  return true;
}

function startUploader() {
  showThankYouPanel('Saving ...');
  
  var uploader = window.cr__uploader;
  var values = getFormValues();
  uploader.start(function(err) {
    console.error('failed to start uploader', err);
    showError('Something went wrong!');
    showThankYouPanel('Something went wrong. Please refresh this page and try again.');
  }, function(assets) {
    var assetId = assets[0].id;
    uploader.setAuthorName(values.name, assetId);
    uploader.setAuthorEmail(values.email, assetId);

    var description = 'Email: ' + values.email + ' |\nPhone: ' + values.phone;
    if (values.instagram) {
      description += ' |\nInstagram: ' + values.instagram;
    }
    if (values.facebook) {
      description += ' |\nFacebook: ' + values.facebook;
    }
    if (values.twitter) {
      description += ' |\nTwitter: ' + values.twitter;
    }
    uploader.setDescription(description, assetId);

    var keywords = [ 'public-uploader', 'my-hamilton-photo-contest-2018', 'category-' + values.category ];
    if (values.mailing) {
      keywords.push('newsletter-ok');
    }
    uploader.setKeywords(keywords, assetId);

    // Finish upload
    uploader.done(function(err) {
      console.log('failed to complete uploader', err);
      showError('Something went wrong!');
      showThankYouPanel('Something went wrong. Please refresh this page and try again.');
    }, function() {
      console.log('success!');
      showThankYouPanel('Thank you for your submission!');
    });
  });
}

var readyInterval;
$(document).ready(function() {
  readyInterval = setInterval(function() {
    if (window.cr__uploader) {
      ready();
    }
  }, 500);

  $("#error-modal-background").click(function() {
    hideErrorModal();
  });

  $("#error-modal-close,#error-modal-close-button").click(function() {
    hideErrorModal();
  });

  $("#form-submit").click(function() {
    if(validateForm()) {
      startUploader();
    }
  });
});

function ready() {
  clearInterval(readyInterval);
  var uploader = window.cr__uploader;
  uploader.init(function(err) {
    console.error('failed to initialize uploader', err);
  }, function() {
  }, {
    maxFiles: 1 // optional configuration object
  });
}