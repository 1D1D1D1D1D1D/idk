import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = ({ className }: AdminPanelPageProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames('', {}, [className])}>
            {t('sdaasdasd')}
        </div>
    );
};
export default AdminPanelPage;
