import React from "react";
import { useAppStore } from "@/app/AppStore";
import { AssetRow } from "./AssetRow";
import { Card, CardBody, Autocomplete, Button, CardHeader, CardFooter, AutocompleteItem, Avatar  } from "@nextui-org/react";

export const Assets: React.FC = () => {
  const { accounts, refreshAccounts, addAsset, refreshSupportedAssets, supportedAssets } = useAppStore();
  const [assetIdPrompt, setAssetIdPrompt] = React.useState<string | null>(null);
  const [isAddingAsset, setIsAddingAsset] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

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
    <Card className="max-w-[500px] min-w-[400px]">
      <CardHeader className="flex justify-center">
        <p className="text-lg">Assets</p>
      </CardHeader>
      <CardBody>
      <div>
        {hasAccounts &&
          accounts.map((account, index) => (
            <div key={`account${index}`}>
              <label>Account #{index}</label>
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
              <div className="grid grid-cols-[150px_auto_100px] gap-2 mb-4">
                <label className="label">
                  <span className="label-text">Add asset:</span>
                </label>

                <Autocomplete
                  value={assetIdPrompt ?? ""}
                  placeholder="Enter asset ID or Name"
                  onChange={setAssetIdPrompt}
                  items={
                    supportedAssets[index]
                      ? Object.values(supportedAssets[index]).map(({ id, name, iconUrl }) => (
                          <AutocompleteItem
                            key={id}
                            startContent={<Avatar alt={name} className="w-6 h-6" src={iconUrl} />}
                          >
                            {name}
                          </AutocompleteItem>
                        ))
                      : []
                  }
                />
                <Button
                  className="btn btn-secondary"
                  onClick={onAddAssetClicked}
                  disabled={isAddingAsset || !assetIdPrompt || assetIdPrompt.trim().length === 0}
                >
                  Add
                </Button>
              </div>
            </div>
          ))}
      </div>
      </CardBody>
      <CardFooter>
        <Button onClick={onRefreshClicked}>
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
};
