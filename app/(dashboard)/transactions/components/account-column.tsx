import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

// Props for the AccountColumn component
type Props = {
    account: string;
    accountId: string;
};

export const AccountColumn = ({
    account,
    accountId,
}: Props) => {
    // Destructure the useOpenAccount hook
    const { onOpen: onOpenAccount } = useOpenAccount();

    //handler to trigger the useOpenAccount hook
    const onClick = () => {
        onOpenAccount(accountId);
    };

    return (
        <div
            onClick={onClick}
            className="flex items-center cursor-pointer hover:underline"
        >
            {account}
        </div>
    );
};