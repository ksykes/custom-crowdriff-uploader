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
    title: $("#input-title").val(),
    location: $("#input-location").val(),
    ageGroup: $("input[name=ageGroup]:checked").val(),
    instagram: $("#input-instagram").val(),
    facebook: $("#input-facebook").val(),
    twitter: $("#input-twitter").val(),
    description: $("#input-description").val(),
    terms: $("#input-terms").prop('checked') ? true : false,
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

  if (!values.title) {
    showError('Your work\'s title is required for submission.');
    return false;
  }

  if (!values.location) {
    showError('Your city or town is required for submission.');
    return false;
  }

  if (!values.ageGroup) {
    showError('Please select your age range.');
    return false;
  }

  if (!values.terms) {
    showError('You must accept the terms and conditions to be eligible.');
    return false;
  }

  if (!values.resident) {
    showError('The artist of this submission must be 4-18 years old and a resident of Ontario to be eligible.');
    return false;
  }

  return true;
}

function startUploader() {
  showThankYouPanel('Saving ...');

  var uploader = window.cr__uploader;
  var values = getFormValues();
  uploader.start(function (err) {
    console.error('failed to start uploader', err);
    showError('Something went wrong!');
    showThankYouPanel('Something went wrong. Please refresh this page and try again.');
  }, function (assets) {
    var assetId = assets[0].id;
    uploader.setAuthorName(values.title, assetId);
    uploader.setAuthorEmail(values.email, assetId);

    var description = `${values.description} — ${values.name}, ${values.location} (Age ${values.ageGroup})`

    uploader.setDescription(description, assetId);

    var keywords = ['public-uploader', 'collector-portal-4245', 'mypandemicstory', 'age-' + values.ageGroup];
    if (values.mailing) {
      keywords.push('newsletter-ok');
    }
    uploader.setKeywords(keywords, assetId);

    // Finish upload
    uploader.done(function (err) {
      console.log('failed to complete uploader', err);
      showError('Something went wrong!');
      showThankYouPanel('Something went wrong. Please refresh this page and try again.');
    }, function() {
      console.log('success!');
      $("#thank-you-panel").addClass('success-message');
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
    if (validateForm()) {
      startUploader();
    }
  });
});

function ready() {
  clearInterval(readyInterval);
  var uploader = window.cr__uploader;
  uploader.init(function (err) {
    console.error('failed to initialize uploader', err);
  }, function() {
  });
}