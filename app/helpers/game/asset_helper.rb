module Game
  module AssetHelper
    include ActionView::Helpers::AssetUrlHelper

    def transform_asset_paths(json_data)
      json_data.map do |item|
        files = item["files"].map do |file|
          file.merge(
            "url" => asset_path(File.join(item["path"], file["url"]))
          )
        end

        item.merge("files" => files)
      end
    end
  end
end

