import { default as ProfileCard, SkeletonCard } from "@/components/ProfileCard";
import { useAppContext } from "@/context/AppContext";
import useFetchUsersQuery from "@/hooks/useFetchUsersQuery";
import { useEffect, useMemo, useRef, useState } from "react";
import "./BirthdayProfiles.css";

function BirthdayProfiles() {
  const [state] = useAppContext();
  const users = state.users.data ?? [];
  const isLoading = state.users.loading;
  const [displayAmount, setDisplayAmount] = useState(10);

  const profilesGridRef = useRef<HTMLElement | null>(null);
  const firstNewDisplayedUserRef = useRef<HTMLDivElement | null>(null);

  const userIds = useMemo(
    () => crypto.getRandomValues(new Int32Array(users.length)),
    [users]
  );
  const firstNewDisplayedUserIndex = useMemo(
    () => displayAmount - 10,
    [displayAmount]
  );

  useEffect(() => {
    console.log(firstNewDisplayedUserRef.current);
    firstNewDisplayedUserRef.current?.focus();
  }, [firstNewDisplayedUserRef.current]);

  useFetchUsersQuery();

  return (
    <main className="birthday-profiles__container">
      <h2 className="birthday-profiles__title">
        Birthdays for {new Date().getFullYear()}
      </h2>
      <section
        className="birthday-profiles__grid"
        role="feed"
        aria-busy={isLoading}
        ref={profilesGridRef}
      >
        {isLoading
          ? Array.from({ length: displayAmount }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : users
              .slice(0, displayAmount)
              .map((user, index) => (
                <ProfileCard
                  key={userIds[index]}
                  user={user}
                  id={userIds[index]}
                  index={index}
                  displayAmount={displayAmount}
                  ref={
                    index === firstNewDisplayedUserIndex
                      ? firstNewDisplayedUserRef
                      : null
                  }
                />
              ))}
      </section>
      <button
        className="birthday-profiles__view_more_button"
        onClick={() => {
          setDisplayAmount((prevAmount) => {
            return prevAmount + 10;
          });
        }}
      >
        View More Profiles
      </button>
    </main>
  );
}

export default BirthdayProfiles;
