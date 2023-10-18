import { Countries } from "@/constants";
import { RandomUser } from "@/types";
import { Ref, forwardRef } from "react";

import { getBirthdayDetails } from "@/utils";

import "./ProfileCard.css";

interface ProfileCardProps {
  user: RandomUser;
  id: number;
  index: number;
  displayAmount: number;
}

const ProfileCard = forwardRef(function ProfileCard(
  { user, index, displayAmount }: ProfileCardProps,
  ref: Ref<HTMLDivElement> | null
) {
  const birthdayDetails = getBirthdayDetails(user);
  return (
    <div
      className="profile-card"
      role="article"
      aria-posinset={index + 1}
      tabIndex={0}
      aria-labelledby={`profile-name-${index + 1}`}
      aria-describedby={`profile-value-${index + 1}`}
      aria-setsize={displayAmount}
      ref={ref}
    >
      <div className={`profile-card__main`}>
        <img className="profile-card__image" src={user.picture.large} alt="" />
        <h3 className="profile-card__name" id={`profile-name-${index + 1}`}>
          {user.name.first} {user.name.last}
        </h3>
        <div className="profile-card__details">
          <p>
            From: <span style={{ fontWeight: 600 }}>{Countries[user.nat]}</span>
          </p>
          <p>
            Birthday:{" "}
            <span style={{ fontWeight: 600 }}>
              {birthdayDetails.date.toDateString()}
            </span>
          </p>
        </div>
      </div>
      <div className={`profile-card__tag ${birthdayDetails.class}`}>
        <div className="profile-card__tag-title">
          <img
            className="profile-card__tag-title__icon"
            src={birthdayDetails.icon}
            alt=""
          />
          <h3
            className="profile-card__tag-title__text"
            id={`profile-value-${index + 1}`}
          >
            {birthdayDetails.value}
          </h3>
        </div>
        <p className="profile-card__tag-details">{birthdayDetails.caption}</p>
      </div>
    </div>
  );
});

export default ProfileCard;
