import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/ui/Page';
import { EditableProfileCard } from 'features/EditableProfileCard/ui/EditableProfileCard';
import { useParams } from 'react-router-dom';
import { ProfileRating } from 'features/profileRating';
import cls from './ProfilePage.module.scss';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    return (
        <Page className={classNames('', {}, [className])}>
            <ProfileRating profileId={id ?? ''} />
            <ProfilePageHeader className={cls.header} />
            <EditableProfileCard className={cls.card} id={id} />

        </Page>
    );
};
export default ProfilePage;
