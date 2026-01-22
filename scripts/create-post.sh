#!/usr/bin/env bash
set -euo pipefail

blog_root="assets/blog"
posts_dir="_posts"
pattern='^([0-9]{4}-[0-9]{2}-[0-9]{2})-([^-]+)-([^-]+)-(.+)$'

if [[ ! -d "$blog_root" ]]; then
  echo "Blog root not found: $blog_root" >&2
  exit 1
fi

find "$blog_root" -mindepth 1 -maxdepth 1 -type d | while read -r dir_path; do
  dir_name="$(basename "$dir_path")"
  if [[ ! "$dir_name" =~ $pattern ]]; then
    echo "Warning: rename folder to YYYY-MM-DD-detailingPackage-carBrand-carModel -> $dir_name" >&2
    continue
  fi

  date="${BASH_REMATCH[1]}"
  package="${BASH_REMATCH[2]}"
  brand="${BASH_REMATCH[3]}"
  model="${BASH_REMATCH[4]}"
  cover_base_path="${blog_root}/$date-$package-$brand-$model/"

  title=""
  case "$package" in
    full)
      title="Full detail"
      ;;
    exterior)
      title="Exterior only"
      ;;
    interior)
      title="Interior only"
      ;;
    *)
      echo "Error: detailingPackage must be full, exterior, or interior -> $dir_name" >&2
      continue
      ;;
  esac
  post_file="$posts_dir/$date-$package-$brand-$model.md"

  if [[ -e "$post_file" ]]; then
    echo "Post already exists: $post_file"
    continue
  fi

  cat > "$post_file" <<EOF
---
layout: post
title:  $title
date:   $date
brand: $brand
model: $model
cover: $cover_base_path
---
EOF

  echo "Created post: $post_file"
done
