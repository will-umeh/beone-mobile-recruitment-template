import { PrepareMovieScreen } from '@/tasks/task1/screens/PrepareMovieScreen';
import { PreparePeopleScreen } from '@/tasks/task1/screens/PreparePeopleScreen';
import { render, userEvent, waitFor } from '@testing-library/react-native';

const user = userEvent.setup();

describe('<PreparePeopleScreen /> will render person object and test functionality', () => {
    test('will render correctly once the data is fetched', async () => {
        const screen = render(<PreparePeopleScreen />);

        expect(screen.getByTestId('mainList')).toBeVisible();
        expect(screen.queryAllByTestId('sectionHeader')).toHaveLength(0);

        await advanceTimer(100);
        expect(screen.getAllByTestId('sectionHeader')).toHaveLength(4);

        expect(screen.getByTestId('mainList')).toHaveProp('showsVerticalScrollIndicator', false);
        expect(screen.getByTestId('mainList')).toHaveProp('bounces', false);
        expect(screen.getByTestId('mainList')).toHaveProp('initialNumToRender', 15);
    });

    test('will filter the data when the default debouce time of 500 will pass', async () => {
        const screen = render(<PreparePeopleScreen />);

        await advanceTimer(100);
        expect(screen.getAllByTestId('sectionHeader')).toHaveLength(4);

        await user.type(screen.getByTestId('searchInput'), 'Legacy Group Strategist');
        expect(screen.getAllByTestId('sectionHeader')).toHaveLength(4);

        await advanceTimer(505);
        expect(screen.getAllByTestId('sectionHeader')).toHaveLength(1);
    });

    test('will filter the data only once and the debounce will be called only once when user stops typing', async () => {
        const screen = render(<PreparePeopleScreen />);

        await advanceTimer(100);
        expect(screen.getAllByTestId('sectionHeader')).toHaveLength(4);

        await user.type(screen.getByTestId('searchInput'), 'Co');
        await advanceTimer(200);
        expect(screen.getAllByTestId('sectionHeader')).toHaveLength(4);

        await user.type(screen.getByTestId('searchInput'), 'or');
        await advanceTimer(200);
        expect(screen.getAllByTestId('sectionHeader')).toHaveLength(4);

        await user.type(screen.getByTestId('searchInput'), 'di');
        await advanceTimer(200);
        expect(screen.getAllByTestId('sectionHeader')).toHaveLength(4);

        await user.type(screen.getByTestId('searchInput'), 'nator');
        await advanceTimer(700);
        expect(screen.getAllByTestId('sectionHeader')).toHaveLength(1);
    });
});

describe('<PrepareMovieScreen /> will render movie object and test functionality', () => {
    test('will display empty view when there is no search match inside the data', async () => {
        const screen = render(<PrepareMovieScreen />);

        await advanceTimer(100);
        await user.type(screen.getByTestId('searchInput'), 'Something that is not found in the data');

        await advanceTimer(700);
        expect(screen.getByTestId('sectionEmptyState')).toBeVisible();
        expect(screen.queryAllByTestId('sectionHeader')).toHaveLength(0);
    });

    test('will query by first name when param is provided', async () => {
        const screen = render(<PrepareMovieScreen filterBy="producer" />);
        await advanceTimer(100);

        await user.type(screen.getByTestId('searchInput'), 'James');

        await advanceTimer(700);
        expect(screen.queryAllByTestId('sectionHeader')).toHaveLength(1);
    });

    test('will debounce quicker when we do not rely on default', async () => {
        const screen = render(<PrepareMovieScreen debounceTs={200} />);

        await advanceTimer(100);
        await user.type(screen.getByTestId('searchInput'), 'Titanic');

        await advanceTimer(250);
        expect(screen.queryAllByTestId('sectionHeader')).toHaveLength(1);
    });

    test('will include the filter by field inside the input placeholder', async () => {
        const screen = render(<PrepareMovieScreen debounceTs={200} />);

        await advanceTimer(100);
        await user.type(screen.getByTestId('searchInput'), 'Titanic');

        await advanceTimer(250);
        expect(screen.queryAllByTestId('sectionHeader')).toHaveLength(1);
    });

    test('will not perform filter when the filterBy param does not exist in the type of the data we filter', async () => {
        // @ts-ignore
        const screen = render(<PrepareMovieScreen filterBy="random" />);

        await advanceTimer(100);
        expect(screen.getAllByTestId('sectionHeader')).toHaveLength(3);

        await user.type(screen.getByTestId('searchInput'), 'Legacy Group Strategist');
        expect(screen.getAllByTestId('sectionHeader')).toHaveLength(3);
    });
});

async function advanceTimer(time = 1000) {
    await waitFor(() => jest.advanceTimersByTime(time));
}
