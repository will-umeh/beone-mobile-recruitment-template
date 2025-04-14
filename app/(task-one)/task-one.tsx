import { TemplatePage } from '@/common/TemplatePage';
import { GenericListScreen } from '@/tasks/task1/screens/GenericListScreen';

export default function TaskOnePage() {
    return (
        <TemplatePage name={'TaskOnePage'}>
            <GenericListScreen />
        </TemplatePage>
    );
}
