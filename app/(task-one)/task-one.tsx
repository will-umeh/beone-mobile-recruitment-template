import { TemplatePage } from '@/common/TemplatePage';
import { GenericListScreen } from '@/tasks/task1/screens/GenericListScreen';
import { PrepareMovieScreen } from '@/tasks/task1/screens/PrepareMovieScreen';
import { PreparePeopleScreen } from '@/tasks/task1/screens/PreparePeopleScreen';

export default function TaskOnePage() {
    return (
        <TemplatePage name={'TaskOnePage'}>
            <PrepareMovieScreen />
        </TemplatePage>
    );
}
