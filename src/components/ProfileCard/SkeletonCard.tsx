import "./SkeletonCard.css";

function SkeletonCard() {
  return (
    <div className="profile-card">
      <div className="profile-card__main">
        <div className="profile-card__image skeleton" />
        <div className="profile-card__name skeleton"></div>
        <div className="profile-card__details skeleton"></div>
      </div>
      <div className="profile-card__tag">
        <div className="profile-card__tag-title skeleton"></div>
        <div className="profile-card__tag-details skeleton"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
