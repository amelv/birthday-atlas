import { Countries } from "@/constants";
import { RandomUser } from "@/types";
import { Ref, forwardRef } from "react";

import { getOrdinalAge } from "@/utils";

import CakeIcon from "@/assets/cake.svg";
import CalendarEventIcon from "@/assets/calendar-event.svg";
import CheckSquareIcon from "@/assets/check-square.svg";

import "./ProfileCard.css";

interface BirthdayDetails {
  date: Date;
  icon: string;
  value: string;
  caption: string;
  class: string;
}

const getBirthdayDetails = (user: RandomUser): BirthdayDetails => {
  const birthdayDate = new Date(user.dob.date);
  const now = new Date();
  const todayDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
  const currentYearBirthdayDate = new Date(
    Date.UTC(
      todayDate.getFullYear(),
      birthdayDate.getMonth(),
      birthdayDate.getDate()
    )
  );
  if (currentYearBirthdayDate.getTime() < todayDate.getTime()) {
    const daysPassed =
      (todayDate.getTime() - currentYearBirthdayDate.getTime()) /
      (1000 * 3600 * 24);
    return {
      date: birthdayDate,
      icon: CheckSquareIcon,
      value: "Celebrated",
      caption: `${daysPassed} days ago.`,
      class: "",
    };
  } else if (currentYearBirthdayDate.getTime() === todayDate.getTime()) {
    return {
      date: birthdayDate,
      icon: CakeIcon,
      value: "TODAY!!!",
      caption: `Happy ${getOrdinalAge(user.dob.age)} birthday!`,
      class: "today",
    };
  } else {
    const daysUntil =
      (currentYearBirthdayDate.getTime() - todayDate.getTime()) /
      (1000 * 3600 * 24);
    return {
      date: birthdayDate,
      icon: CalendarEventIcon,
      value: "Upcoming",
      caption: `${daysUntil} days to go.`,
      class: "upcoming",
    };
  }
};

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
