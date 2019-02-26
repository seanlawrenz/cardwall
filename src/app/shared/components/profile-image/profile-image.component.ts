import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Resources } from '@app/models';
import { ConfigService } from '@app/app-services';
import { generateProfileImageHtml } from '@app/utils/generateProfileImageHtml';

@Component({
  selector: 'td-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
})
export class ProfileImageComponent implements OnInit, OnChanges {
  @Input() resource: Resources;
  @Input() imgClass: string;

  public htmlToBeRender;

  constructor(public config: ConfigService) {}

  ngOnInit() {
    console.log(this.resource);
    this.updateUI();
  }

  ngOnChanges() {
    this.updateUI();
  }

  private updateUI() {
    let pathArray;
    let profileImageFileName = '';
    let profileImageHandler = '';
    let firstNamePlaceholder = 'Unassigned';
    let lastNamePlaceholder = '';
    let refID = 0;

    if (this.resource) {
      refID = this.resource.referenceId;

      if (this.resource.firstName) {
        firstNamePlaceholder = this.resource.firstName;
      }

      if (this.resource.lastName) {
        lastNamePlaceholder = this.resource.lastName;
      }

      if (this.resource.profilePicturePath) {
        pathArray = `${this.config.config.UserProfilePathBase}${this.resource.profilePicturePath}`.split('?');

        // Grabbing the file path of the user
        const fileName = pathArray[2].split('=')[1];

        // Only set profile image params if filename is valid, and not the string 'null'
        if (Boolean(fileName) && fileName !== null) {
          // Only set filename and fn-handler if it's not 'noprofilepic' OR firstName or LastName is not set
          if (fileName !== 'NoProfilePic.png' || firstNamePlaceholder === 'Unassigned' || lastNamePlaceholder === '') {
            profileImageFileName = fileName;
            profileImageHandler = pathArray[0];
          }
        }
      }

      if (window.TeamDynamix.generateProfileImageHtml) {
        this.htmlToBeRender = window.TeamDynamix.generateProfileImageHtml({
          userId: refID,
          userFirstName: firstNamePlaceholder,
          userLastName: lastNamePlaceholder,
          userProfileImageFileName: profileImageFileName,
          userProfileImageHandler: profileImageHandler,
          cssClass: this.imgClass,
        });
      } else {
        this.htmlToBeRender = generateProfileImageHtml({
          userId: refID,
          userFirstName: firstNamePlaceholder,
          userLastName: lastNamePlaceholder,
          userProfileImageFileName: profileImageFileName,
          userProfileImageHandler: profileImageHandler,
          cssClass: this.imgClass,
        });
      }
    } else {
      this.htmlToBeRender = '';
    }
  }
}
