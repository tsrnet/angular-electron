import {AccountProviderResourceSet} from './AccountProviderResourceSet';

export interface AccountProvider {
    name: string;
    resources: AccountProviderResourceSet;
}

export function searchByName(accountProviderList: AccountProvider[], providerName): AccountProvider {
    let findedAccountProvider = null;
    accountProviderList.forEach((accountProvider: AccountProvider) => {
        if (accountProvider.name == providerName) findedAccountProvider = accountProvider;
    })
    return findedAccountProvider;
} 