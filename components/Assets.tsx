import React from "react";
import { useAppStore } from "@/app/AppStore";
import { Card, CardHeader, Table, TableHeader, TableColumn, TableBody, Button, Autocomplete, AutocompleteItem, Avatar, Snippet, TableCell, TableRow } from "@nextui-org/react";
import { AssetRow } from "./RowAsset";

export const Assets: React.FC = () => {
  const { accounts, refreshAccounts, addAsset, refreshSupportedAssets, supportedAssets } = useAppStore();
  const [assetIdPrompt, setAssetIdPrompt] = React.useState<string | null>(null);
  const [isAddingAsset, setIsAddingAsset] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  console.log(accounts, "accounts")

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
    <Card className="max-w-[1000px] min-w-[600px]">
      <CardHeader className="flex justify-center">
        <p className="text-lg">Assets</p>
      </CardHeader>
      {hasAccounts &&
        accounts.map((account, index) => (
          <div key={`account${index}`}>
            <p>Account #{index}</p>
            <Table className="p-5">
  <TableHeader columns={[
    { key: "asset", label: "ASSET" },
    { key: "name", label: "NAME" },
    { key: "type", label: "TYPE" },
    { key: "balance", label: "BALANCE" },
    { key: "address", label: "ADDRESS" },
  ]}>
    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody>
              {Object.entries(account).map(([assetId, assetInfo]) => (
                  <AssetRow key={assetId} assetInfo={assetInfo} />
              ))}
              </TableBody>
            </Table>
            <div className="flex flex-cols-2 p-4">
              <Autocomplete
                value={assetIdPrompt ?? ""}
                onSelectionChange={setAssetIdPrompt}
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
                disabled={isAddingAsset || !assetIdPrompt || assetIdPrompt.trim().length === 0}
              >
                Add
              </Button>
            </div>
          </div>
        ))}
      <Button onClick={onRefreshClicked} disabled={isRefreshing}>
        Refresh
      </Button>
    </Card>
  );
};