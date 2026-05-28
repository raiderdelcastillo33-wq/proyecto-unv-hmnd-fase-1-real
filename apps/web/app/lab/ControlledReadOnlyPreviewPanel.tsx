'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  analyzeReadOnlyOrganizationPreview,
  createReadOnlyPreviewMetadata,
  type ReadOnlyOrganizationPreview,
  type ReadOnlyPreviewFileMetadata
} from '@/lib/read-only-organization-preview'

export function ControlledReadOnlyPreviewPanel() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<ReadOnlyPreviewFileMetadata[]>([])
  const [preview, setPreview] = useState<ReadOnlyOrganizationPreview | null>(null)

  useEffect(() => {
    inputRef.current?.setAttribute('webkitdirectory', '')
    inputRef.current?.setAttribute('directory', '')
  }, [])

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files

    if (!files) {
      setSelectedFiles([])
      setPreview(null)
      return
    }

    setSelectedFiles(createReadOnlyPreviewMetadata(files))
    setPreview(null)
  }

  function handleAnalyzePreview(): void {
    setPreview(analyzeReadOnlyOrganizationPreview(selectedFiles))
  }

  return (
    <section className="read-only-preview-panel" aria-labelledby="read-only-preview-heading">
      <div className="organization-hero">
        <div className="panel-heading">
          <p className="result-eyebrow">Controlled Read-Only Organization Preview</p>
          <h2 id="read-only-preview-heading">Real utility, limited to browser-selected metadata.</h2>
          <p>
            Select a folder manually to preview file metadata patterns. Nothing is uploaded, read by the server,
            moved, renamed, deleted, or written.
          </p>
        </div>
        <div className="simulation-badge-system">
          <span className="info-chip">simulationOnly: false</span>
          <span className="info-chip">executionMode: read-only-preview</span>
          <span className="info-chip">actionExecuted: false</span>
          <span className="info-chip">No write/delete/move</span>
        </div>
      </div>

      <div className="read-only-guardrails" aria-label="Read-only preview guardrails">
        <strong>Owner-controlled preview</strong>
        <span>Manual folder selection</span>
        <span>Metadata only</span>
        <span>No content parsing</span>
        <span>No server upload</span>
        <span>No host-wide scan</span>
      </div>

      <div className="read-only-picker">
        <label className="field-label" htmlFor="read-only-folder">
          Select folder for read-only preview
        </label>
        <input
          className="file-input"
          id="read-only-folder"
          multiple
          onChange={handleFilesSelected}
          ref={inputRef}
          type="file"
        />
        <div className="actions">
          <button
            className="primary-button"
            disabled={selectedFiles.length === 0}
            onClick={handleAnalyzePreview}
            type="button"
          >
            Generate read-only preview
          </button>
          <span className="meta-text">Approval-required preview. No file operation will run.</span>
        </div>
      </div>

      {selectedFiles.length > 0 ? (
        <div className="read-only-metrics" aria-label="Selected metadata summary">
          <div>
            <span>{selectedFiles.length}</span>
            <p>Selected metadata records</p>
          </div>
          <div>
            <span>{selectedFiles.filter((file) => file.isImage).length}</span>
            <p>Images detected</p>
          </div>
          <div>
            <span>{selectedFiles.filter((file) => file.isScreenshot).length}</span>
            <p>Screenshots detected</p>
          </div>
          <div>
            <span>{selectedFiles.filter((file) => file.blockedReason).length}</span>
            <p>Blocked protected paths</p>
          </div>
        </div>
      ) : (
        <section className="result-state result-state--compact">
          <p className="result-eyebrow">Empty state</p>
          <h3>No folder selected yet</h3>
          <p>Choose a folder from the browser picker to create a local metadata-only organization preview.</p>
        </section>
      )}

      {preview ? (
        <>
          <div className="read-only-metrics" aria-label="Read-only analysis metrics">
            <div>
              <span>{preview.analyzedFileCount}</span>
              <p>Analyzed files</p>
            </div>
            <div>
              <span>{preview.duplicateGroups.length}</span>
              <p>Duplicate candidates</p>
            </div>
            <div>
              <span>{preview.problematicNameCount}</span>
              <p>Problematic names</p>
            </div>
            <div>
              <span>{preview.mixedCategoryCount}</span>
              <p>Category groups</p>
            </div>
          </div>

          <section className="organization-section">
            <div className="organization-section__heading">
              <p className="result-eyebrow">Organization proposal</p>
              <h3>{preview.label}</h3>
              <p>Suggested groups are proposals only. No file has been changed.</p>
            </div>
            <div className="organization-card-grid">
              {preview.suggestedGroups.map((group) => (
                <article className="organization-card" key={group.id}>
                  <span className="info-chip">{group.category}</span>
                  <h4>{group.suggestedFolder}</h4>
                  <p>{group.itemCount} file(s) detected for this category.</p>
                </article>
              ))}
            </div>
          </section>

          <section className="organization-section">
            <div className="organization-section__heading">
              <p className="result-eyebrow">Duplicate candidates</p>
              <h3>{preview.duplicateGroups.length} proposal-only group(s)</h3>
            </div>
            <div className="response-meta">
              {preview.duplicateGroups.length > 0 ? (
                preview.duplicateGroups.map((group) => (
                  <span className="info-chip" key={group.id}>
                    {group.label}: {group.actionMode}
                  </span>
                ))
              ) : (
                <span className="info-chip">No duplicate candidates detected</span>
              )}
            </div>
          </section>

          <section className="organization-section">
            <div className="organization-section__heading">
              <p className="result-eyebrow">Preview checklist</p>
              <h3>Owner review before any future action</h3>
            </div>
            <div className="organization-checklist">
              {preview.checklist.map((item) => (
                <label key={item}>
                  <input checked readOnly type="checkbox" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            <div className="response-meta">
              <span className="info-chip">filesystemWriteAccess: false</span>
              <span className="info-chip">filesystemDeleteAccess: false</span>
              <span className="info-chip">filesystemMoveAccess: false</span>
              <span className="info-chip">{preview.filesystemReadMode}</span>
            </div>
          </section>
        </>
      ) : null}
    </section>
  )
}
