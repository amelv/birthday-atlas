import "./SkeletonCard.css";

function SkeletonCard() {
  return (
    <div className="profiles-card">
      <div className="profiles-card__main">
        <div className="profiles-card__image skeleton" />
        <div className="profiles-card__name skeleton"></div>
        <div className="profiles-card__details skeleton"></div>
      </div>
      <div className="profiles-card__tag">
        <div className="profiles-card__tag-title skeleton"></div>
        <div className="profiles-card__tag-details skeleton"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
