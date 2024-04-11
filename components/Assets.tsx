import React from "react";
import { useAppStore } from "@/app/AppStore";
import { Card, CardHeader, Table, TableHeader, th, TableBody, Button, Autocomplete, AutocompleteItem, Avatar, Snippet, TableCell, TableRow } from "@nextui-org/react";
import { AssetRow } from "./RowAsset";

export const assetInfo1 = {
  asset: {
    id: "1",
    name: "BTC",
    type: "Bitcoin",
    iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  address: { 
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
  balance: {
    total: "100",
  },
}

export const Assets: React.FC = () => {
  const { accounts, refreshAccounts, addAsset, refreshSupportedAssets, supportedAssets } = useAppStore();
  const [assetIdPrompt, setAssetIdPrompt] = React.useState<string | null>(null);
  const [isAddingAsset, setIsAddingAsset] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const onSelectionChange = (value) => {
    setAssetIdPrompt(value);
  };

  const onAddAssetClicked = async () => {
    if (!assetIdPrompt) {
      return;
    }

    setIsAddingAsset(true);
    try {
      await addAsset(0, assetIdPrompt);
      await refreshAccounts();
      await refreshSupportedAssets(0);
    } finally {
      setIsAddingAsset(false);
      setAssetIdPrompt(null);
    }
  };

  const onRefreshClicked = async () => {
    setIsRefreshing(true);
    try {
      await refreshAccounts();
      await refreshSupportedAssets(0);
    } finally {
      setIsRefreshing(false);
    }
  };

  const hasAccounts = accounts.length > 0;

  React.useEffect(() => {
    async function fetchAssets() {
      try {
        await refreshAccounts();
        await refreshSupportedAssets(0);
      } catch (e) {}
    }
    fetchAssets();
  }, []);

  return (
    <Card className="max-w-[1200px] min-w-[600px] p-3">
      <CardHeader className="flex justify-center">
        <p className="text-lg">Assets</p>
      </CardHeader>
      {hasAccounts &&
        accounts.map((account, index) => (
          <div key={`account${index}`}>
            <p>Account #{index}</p>
            <table className="table table-fixed">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Address</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(account).map(([assetId, assetInfo]) => (
                    <AssetRow key={assetId} assetInfo={assetInfo} />
                  ))}
                </tbody>
              </table>
            <div className="flex flex-cols-2 p-4">
              <Autocomplete
                value={assetIdPrompt ?? ""}
                onSelectionChange={onSelectionChange}
                items={
                  supportedAssets[index]
                    ? Object.values(supportedAssets[index]).map(({ id, name, iconUrl }) => ({ id, name, iconUrl }))
                    : []
                }
              >
                {(asset) => (
                  <AutocompleteItem
                    key={asset.id}
                    textValue={`${asset.name} ${asset.id}`}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar alt={asset.name} className="flex-shrink-0" size="sm" src={asset.iconUrl} />
                      <div>{asset.name}</div>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Button
                className="ml-2"
                onClick={onAddAssetClicked}
                isDisabled={isAddingAsset || !assetIdPrompt || assetIdPrompt.trim().length === 0}
              >
                Add
              </Button>
            </div>
          </div>
        ))}
      <Button
        className="mb-5 ml-3 max-w-[250px]" 
        onClick={onRefreshClicked} 
        isDisabled={isRefreshing}>
        Refresh
      </Button>
    </Card>
  );
};