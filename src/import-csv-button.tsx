import React, { useState, ChangeEvent } from "react";
import { Button as RAButton } from "react-admin";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { useNotify, useDataProvider } from "react-admin";

import { i18nProvider } from "./providers/i18nProvider";
import { processCsvFile } from "./csv-extractor";

export const ImportButton = (props: any) => {
  const [open, setOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [fileName, setFileName] = useState(null as string);
  const [values, setValues] = useState(null as any[]);
  const [errorTxt, setErrorTxt] = useState(null as string);
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const handleSubmitCreate = async () => {
    setImporting(true);
    try {
      if (values.some((v) => v.id)) {
        throw new Error(i18nProvider.translate("csv.error.hasId"));
      }

      if (preCommitCallback) {
        setValues(preCommitCallback("create", values));
      }

      if (!handleFileData) {
        const result = await Promise.all(
          values.map((value) => dataProvider.create(resource, { data: value }))
        );

        if (result) {
          handleComplete();
        }
      } else {
        handleFileData(values);
        handleComplete();
      }
    } catch (error) {
      handleComplete(error);
    }
  };

  const handleSubmitOverwrite = async () => {
    setImporting(true);
    try {
      if (values.some((v) => !v.id)) {
        throw new Error(i18nProvider.translate("csv.error.noId"));
      }
      if (preCommitCallback) setValues(preCommitCallback("overwrite", values));
      Promise.all(
        values.map((value) =>
          dataProvider.update(resource, { id: value.id, data: value })
        )
      ).then(() => {
        handleComplete();
      });
    } catch (error) {
      handleComplete(error);
    }
  };

  const {
    resource,
    parseConfig,
    logging,
    preCommitCallback,
    withOverwrite = true,
    handleFileData,
  } = props;

  if (logging) {
    console.log({ props });
  }

  if (!resource) {
    throw new Error(i18nProvider.translate("csv.error.emptyResource"));
  }

  let { variant, label, resourceName } = props;

  if (!label) {
    label = i18nProvider.translate("csv.main.import");
  }

  if (!variant) {
    variant = "text";
  }

  if (!resourceName) {
    resourceName = resource;
  }

  const openImportDialog = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setImporting(false);
    setFileName(null as string);
    setValues(null as any[]);
  };

  const handleComplete = (error = false) => {
    handleClose();
    if (!error)
      notify(`${i18nProvider.translate("csv.alert.imported")} ${fileName}`);
    if (error) {
      notify(
        `${i18nProvider.translate(
          "csv.error.importing"
        )} ${fileName}, ${error}`,
        "error"
      );
    }
  };

  const onFileAdded = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFileName(file.name);
    try {
      const values = await processCsvFile(file, parseConfig);
      if (logging) {
        console.log({ values });
      }
      setValues(values);
      setErrorTxt(null);
    } catch (error) {
      console.error(error);
      setValues(null);
      setErrorTxt(error.toString());
    }
  };

  return (
    <>
      <RAButton
        color="primary"
        component="span"
        variant={variant}
        label={label}
        onClick={openImportDialog}
      >
        <GetAppIcon style={{ transform: "rotate(180deg)", fontSize: "20" }} />
      </RAButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {i18nProvider.translate("csv.dialog.importTo")} "{resourceName}"
        </DialogTitle>
        <DialogContent>
          <div
            id="alert-dialog-description"
            style={{ fontFamily: "sans-serif" }}
          >
            <p style={{ margin: "0" }}>
              {i18nProvider.translate("csv.dialog.dataFileReq")}
            </p>
            <ol>
              <li>{i18nProvider.translate("csv.dialog.extension")}</li>
              <li>{i18nProvider.translate("csv.dialog.idColumnCreate")}</li>
              <li>{i18nProvider.translate("csv.dialog.idColumnUpdate")}</li>
            </ol>
            <Button variant="contained" component="label">
              <span>{i18nProvider.translate("csv.dialog.chooseFile")}</span>
              <GetAppIcon
                style={{ transform: "rotate(180deg)", fontSize: 20 }}
              />
              <input
                type="file"
                style={{ display: "none" }}
                onChange={onFileAdded}
                accept=".csv,.tsv,.txt"
              />
            </Button>
            {!!fileName && (
              <p style={{ marginBottom: 0 }}>
                {i18nProvider.translate("csv.dialog.processed")}:{" "}
                <strong>{fileName}</strong>
              </p>
            )}
            {!!values && (
              <p style={{ margin: 0 }}>
                {i18nProvider.translate("csv.dialog.rowCount")}:{" "}
                <strong>{values.length}</strong>
              </p>
            )}
            {!!errorTxt && (
              <p style={{ margin: 0, color: "red" }}>{errorTxt}</p>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <span>{i18nProvider.translate("csv.dialog.cancel")}</span>
          </Button>
          <Button
            disabled={!values || importing}
            onClick={handleSubmitCreate}
            color="secondary"
            variant="contained"
          >
            {importing && <CircularProgress size={18} thickness={2} />}
            <span>{i18nProvider.translate("csv.dialog.importNew")}</span>
          </Button>
          {withOverwrite && (
            <Button
              disabled={!values || importing}
              onClick={handleSubmitOverwrite}
              color="primary"
              variant="contained"
            >
              {importing && <CircularProgress size={18} thickness={2} />}
              <span>{i18nProvider.translate("csv.dialog.importOverride")}</span>
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
