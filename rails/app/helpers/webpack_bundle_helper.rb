module WebpackBundleHelper
  class BundleNotFound < StandardError; end

  def javascript_webpack_bundle_tag(entry, **options)
    path = asset_bundle_path("#{entry}.js")
    javascript_include_tag(path, **options)
  end

  private

  MANIFEST_FILE = 'manifest.json'.freeze

  def asset_bundle_path(entry, **options)
    raise BundleNotFound, "Could not find bundle with name #{entry}" unless manifest.key? entry
    asset_path(manifest.fetch(entry), **options)
  end

  def manifest
    @manifest ||= JSON.parse(File.read(manifest_path))
  end

  def manifest_path
    Rails.root.join('public/packs', MANIFEST_FILE)
  end
end
