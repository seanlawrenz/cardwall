function getBackgroundColorClass(userId) {
  const colorClasses = ['gray-bg', 'red-bg', 'green-bg', 'yellow-bg', 'blue-bg'];
  return colorClasses[userId % colorClasses.length];
}

export const generateProfileImageHtml = options => {
  const defaults = {
    userId: 0,
    userFirstName: '',
    userLastName: '',
    userFullName: '',
    userInitials: '',
    userProfileImageFileName: '',
    userProfileImageHandler: '',
    userProfileUrl: '',
    noUserImageType: 'system',
    cssClass: '',
  };

  options = { ...defaults, ...options };

  // set up the user's full name
  if (options.userFullName === '') {
    options.userFullName = options.userFirstName + ' ' + options.userLastName;
  }

  if (options.userFullName.length <= 1) {
    options.userFullName = 'System';
  }

  // set the initials if they aren't set already
  if (options.userInitials === '' && options.userFirstName.length > 0 && options.userLastName.length > 0) {
    options.userInitials = options.userFirstName[0].toUpperCase() + options.userLastName[0].toUpperCase();
  }

  // set up some properties we'll need to render the image
  const divImage = document.createElement('div');
  divImage.onclick = () => {};
  divImage.title = options.userFullName;
  divImage.className = 'profile-image';

  if (options.cssClass.length > 0) {
    divImage.className += ' ' + options.cssClass;
  }

  if (options.userProfileUrl.length > 0) {
    divImage.onclick = () => {
      const url = `${options.userProfileUrl},992,700,userProfile`;
      return window.open(url);
    };
    divImage.title = 'View Profile for ' + options.userFullName;
    divImage.className += ' clickable';
    divImage.setAttribute('role', 'link');
  }

  if (!options.userProfileImageFileName && (options.userId <= 0 || options.userInitials.length === 0)) {
    // we don't have enough information to render an image or initials,
    // so let's render whichever non-user image we need to
    divImage.className += ' gray-bg initials system';

    switch (options.noUserImageType) {
      case 'system':
        divImage.innerHTML = '<span class="fa fa-gears" aria-hidden="true"></span><span class="sr-only">System</span>';
        divImage.title = 'System';
        break;

      case 'group':
        divImage.innerHTML = '<span class="fa fa-users" aria-hidden="true"></span>';
        break;

      case 'placeholder':
        divImage.innerHTML = '<span class="fa fa-user-o" aria-hidden="true"></span>';
        break;

      default:
        divImage.innerHTML = '<span class="fa fa-user" aria-hidden="true"></span><span class="sr-only">Anonymous User</span>';
        divImage.className += ' anonymous';
        divImage.title = '';
    }
  } else if (
    options.userProfileImageFileName &&
    options.userProfileImageFileName.length > 0 &&
    options.userProfileImageFileName !== 'NoProfilePic.png'
  ) {
    // the user has a profile image set, so let's do some calculations and render it
    const profileImage = new Image();
    profileImage.src = options.userProfileImageHandler + '?fileName=' + encodeURIComponent(options.userProfileImageFileName);
    profileImage.alt = options.userFullName;

    divImage.appendChild(profileImage);
    divImage.className += ' picture';
  } else {
    // the user has not set up a profile image, so render their initials
    if (options.userInitials.length > 0) {
      divImage.appendChild(document.createTextNode(options.userInitials));
    }

    // set the background color based on the user's ID
    divImage.className += ' ' + getBackgroundColorClass(options.userId);

    // set the class to indicate that this image is for initials
    divImage.className += ' initials';
  }

  // now that we have all of the properties configured, we just need to render the image
  return divImage.outerHTML;
};
