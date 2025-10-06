#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

DEFAULT_DOCS_REPO_PATH="${REPO_ROOT}/../developer-docs"
DEVELOPER_DOCS_REPO_PATH="${DEVELOPER_DOCS_REPO_PATH:-${DEFAULT_DOCS_REPO_PATH}}"

DOCS_SUBDIRECTORY="sdk-references"

ensure_developer_docs_repository() {
  if [[ ! -d "${DEVELOPER_DOCS_REPO_PATH}" ]]; then
    echo "Developer docs repository not found at ${DEVELOPER_DOCS_REPO_PATH}" >&2
    echo "Clone repo or set DEVELOPER_DOCS_REPO_PATH environment variable." >&2
    exit 1
  fi

  local target_directory="${DEVELOPER_DOCS_REPO_PATH}/${DOCS_SUBDIRECTORY}"
  if [[ ! -d "${target_directory}" ]]; then
    echo "Expected directory ${target_directory} not found." >&2
    exit 1
  fi
}

generate_docs_for_workspace() {
  local workspace_name="$1"

  npm run docs --workspace "${workspace_name}"
}

copy_reference_file() {
  local package_directory="$1"
  local target_filename="$2"

  local generated_path="${REPO_ROOT}/${package_directory}/docs/index.md"
  local destination_path="${DEVELOPER_DOCS_REPO_PATH}/${DOCS_SUBDIRECTORY}/${target_filename}"

  if [[ ! -f "${generated_path}" ]]; then
    echo "Generated documentation missing at ${generated_path}" >&2
    exit 1
  fi

  cp "${generated_path}" "${destination_path}"
  echo "Updated ${destination_path}" >&2
}

update_package_documentation() {
  local workspace_name="$1"
  local package_directory="$2"
  local target_filename="$3"

  generate_docs_for_workspace "${workspace_name}"
  copy_reference_file "${package_directory}" "${target_filename}"
}

main() {
  cd "${REPO_ROOT}"

  ensure_developer_docs_repository

  update_package_documentation "@nlxai/core" "packages/core" "chatcore-sdk-reference.md"

  update_package_documentation "@nlxai/touchpoint-ui" "packages/touchpoint-ui" "touchpoint-sdk-reference.md"

  update_package_documentation "@nlxai/voice-plus-core" "packages/voice-plus-core" "voice+_script-sdk-reference.md"

  echo "SDK reference documentation updated successfully" >&2
}

main


