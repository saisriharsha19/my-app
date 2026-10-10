# Personal website database retirement

The frontend is migrated to repository-managed JSON before database access is shut down. Thirty articles, including IDs 7–9, are preserved in `src/data/journals.json`; current profile and project content is in `profile.json`, and the original public project export is in `portfolio-archive.json`. Existing contact messages stay in the retained database and are never published to the repository.

The identified resource is Azure SQL database `personalwebsitedb`, on server `personalwebsitedbserver`, resource group `New_RG`, subscription `2564a896-1966-4a4e-92ec-fb05e950e17a`. The server contains only this application database and the system `master` database. No private endpoints were found during inspection.

This is a Basic-tier provisioned database, which cannot be paused. The reversible deactivation is to disable the server's public network access. With no private endpoints, this blocks the old backend's database access while retaining all data and existing firewall configuration. It does not delete the database or end Basic-tier billing. Ending billing requires an explicitly authorized backup-and-delete operation.

To disable access after verifying the static site:

```powershell
az sql server update --subscription 2564a896-1966-4a4e-92ec-fb05e950e17a --resource-group New_RG --name personalwebsitedbserver --enable-public-network false
```

To restore the previous access setting if recovery is needed:

```powershell
az sql server update --subscription 2564a896-1966-4a4e-92ec-fb05e950e17a --resource-group New_RG --name personalwebsitedbserver --enable-public-network true
```

The Google Cloud Run backend is a separate resource. Its CLI authentication was expired during this migration, so its container cannot be shut down with the available session. Disabling Azure SQL access prevents that backend from reading or writing the retired database. The Azure Static Web Apps frontend remains independent of both resources.
