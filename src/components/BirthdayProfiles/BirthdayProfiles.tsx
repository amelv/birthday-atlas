import { default as ProfileCard, SkeletonCard } from "@/components/ProfileCard";
import { useAppContext } from "@/context/AppContext";
import useFetchUsersQuery from "@/hooks/useFetchUsersQuery";
import { useEffect, useMemo, useRef, useState } from "react";
import "./BirthdayProfiles.css";

const DISPLAY_AMOUNT = 12;

function BirthdayProfiles() {
  const [state] = useAppContext();
  const [displayAmount, setDisplayAmount] = useState(DISPLAY_AMOUNT);

  const containerRef = useRef<HTMLElement | null>(null);
  const profilesGridRef = useRef<HTMLElement | null>(null);
  const firstNewDisplayedUserRef = useRef<HTMLDivElement | null>(null);

  // No memo since array is recreated on every render
  const displayedUsers = state.users.displayList.slice(0, displayAmount) ?? [];
  const isLoading = state.users.loading;

  const userIds = useMemo(
    () =>
      crypto.getRandomValues(new Int32Array(state.users.displayList.length)),
    [state.users.displayList.length]
  );

  const firstNewDisplayedUserIndex = useMemo(
    () => displayAmount - 10,
    [displayAmount]
  );

  useEffect(() => {
    window.requestAnimationFrame(() => {
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [
    state.exploreSettings.sort.order,
    state.exploreSettings.sort.by,
    containerRef.current,
  ]);

  useEffect(() => {
    firstNewDisplayedUserRef.current?.focus();
  }, [firstNewDisplayedUserRef.current]);

  useFetchUsersQuery();

  return (
    <main className="birthday-profiles__container" ref={containerRef}>
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
          : displayedUsers.map((user, index) => (
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
        disabled={displayAmount >= state.users.displayList.length}
        onClick={() => {
          setDisplayAmount((prevAmount) => {
            return prevAmount + DISPLAY_AMOUNT;
          });
        }}
      >
        View More Profiles
      </button>
    </main>
  );
}

export default BirthdayProfiles;
