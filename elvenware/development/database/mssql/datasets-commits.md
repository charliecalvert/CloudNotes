DataSets Commits
================

Some code to make it possible to commit data to the database.

``` {.csharpcode}
this.detailsDataAdapter.UpdateCommand = new SqlCommand();
this.detailsDataAdapter.UpdateCommand.Connection = connection;
this.detailsDataAdapter.UpdateCommand.CommandText = @"UPDATE event SET Description = @Description "
                                                    + "WHERE EventID = @EventId;";
this.detailsDataAdapter.UpdateCommand.Parameters.Add("@EventId", SqlDbType.Int);
this.detailsDataAdapter.UpdateCommand.Parameters.Add("@Description", SqlDbType.VarChar);
```

And now we are reading to save the data.

``` {.csharpcode}
public void Save(int EventId, string data, string shortDescription, string description)
{
    this.detailsDataAdapter.UpdateCommand.Parameters["@EventId"].Value = EventId; 
    this.detailsDataAdapter.UpdateCommand.Parameters["@Description"].Value = description; 
    this.detailsDataAdapter.Update(this.masterDetailDataSet.Tables[1]);    
}
```
