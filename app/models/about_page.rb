class AboutPage < Obj
  attribute :title, :string
  attribute :subtitle, :string
  attribute :body, :widgetlist
  attribute :child_order, :referencelist
  attribute :tags, :stringlist
end
