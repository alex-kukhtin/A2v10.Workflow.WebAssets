
:npm run build --silent

copy public\assets\*.js nuget\wwwroot\scripts
copy public\assets\*.css nuget\wwwroot\css

cd nuget

nuget pack A2v10.Workflow.WebAssets.nuspec -OutputDirectory C:\A2v10_Net6\NuGet.local

pause
