import {vi} from 'vitest'
import { screen } from '@testing-library/react';
import { render } from '@/test'; 
import ProfileCard from '@/components/ProfileCard'; 

vi.mock('@/utils', () => ({
  getBirthdayDetails: vi.fn(() => ({
    date: new Date(1990, 4, 3),
    value: 'TODAY!!!',
    caption: 'Happy 30th Birthday!',
    icon: 'some-icon-path',
    class: 'some-class'
  }))
}));

const mockUser = {
  name: { title: 'Mr.', first: 'John', last: 'Doe' },
  nat: 'US',
  dob: {date: '1990-05-03T07:36:28.568Z', age: 30},
  picture: { large: 'some-image-path', medium: 'some-image-path', small: 'some-image-path', thumbnail: 'some-image-path' },
};

describe('ProfileCard component', () => {
  it('should render user details and birthday information', () => {
    render(
      <ProfileCard user={mockUser} id={1} index={0} displayAmount={1} />,
      { providerProps: { value: [] } } 
    );

    // Check that user name is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    // Check that country is rendered
    expect(screen.getByText('United States')).toBeInTheDocument();
    // Check that birthday date is rendered
    expect(screen.getByText('Thu May 03 1990')).toBeInTheDocument();
    // Check that birthday value is rendered
    expect(screen.getByText('TODAY!!!')).toBeInTheDocument();
    // Check that birthday caption is rendered
    expect(screen.getByText('Happy 30th Birthday!')).toBeInTheDocument();
  });
});
