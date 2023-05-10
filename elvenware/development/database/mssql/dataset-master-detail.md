---
layout: post
date: 2023-05-10 04:39:14 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/database/mssql/dataset-master-detail.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/database/mssql
fileName: dataset-master-detail.md
relativePath: /database/mssql/dataset-master-detail.md
title: dataset-master-detail
directoryName: mssql
category : css-guide
---

DataSet Master Detail
=====================

An example of an abstract class for setting up a master detail
relationship with DataSets

``` {.csharpcode}
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace Anitya.Utils
{
    public abstract class DataSetMasterDetail
    {
        public BindingSource bindingSourceMaster = new BindingSource();
        public BindingSource bindingSourceDetail = new BindingSource();
        private DataSet masterDetailDataSet = null;
        private SqlDataAdapter dataAdapterPresidents = null;
        private SqlDataAdapter detailsDataAdapter = null;
        private string detailTable = null;

        public DataSet MasterDetailDataSet { get { return masterDetailDataSet; } }
        public SqlDataAdapter DataAdapterMaster { get { return dataAdapterPresidents; } }
        public SqlDataAdapter DataAdapterDetail { get { return detailsDataAdapter; } }

        public DataRow GetCurrentDetailRow()
        {
            DataRowView drv = (DataRowView)bindingSourceDetail.Current;
            return drv.Row;
        }

        public DataRow GetCurrentMasterRow()
        {
            DataRowView drv = (DataRowView)bindingSourceMaster.Current;
            return drv.Row;
        }

        /// <summary>
        /// This method does all the dirty work of setting up a Master Detail. Call it like this:
        /// 
        ///   dataGridViewPresidents.DataSource = masterDetail.bindingSourceMaster;
        ///   dataGridViewEvent.DataSource = masterDetail.bindingSourceDetail;
        ///   masterDetail.GetData(masterQuery, detailQuery, ConnectionTool.GetConnectionString(), connectingId);
        ///   
        /// </summary>
        /// <param name="masterQuery">Selct data from the master table: select * from Presidents</param>
        /// <param name="detailQuery">Select data from the detail table: select * from Event</param>
        /// <param name="connectionString">The connection string</param>
        /// <param name="connectingId">The id that binds the master and detail table on a foreign key</param>
        public void GetData(string masterQuery, string detailQuery, string connectionString, string connectingId)
        {
            string masterTable = "masterTable";
            string detailTable = "detailTable";            
            string relationName = "relationName";

            GetData(masterQuery, detailQuery, connectionString, connectingId, masterTable, detailTable, relationName);
        }

        /// <summary>
        /// Pass in information like this:
        ///   string masterTable = "Presidents";
        ///   string detailTable = "Events";
        ///   string connectingId = "PresidentId";
        ///   string relationName = "PresidentEvent";            
        ///   string connectionString = ConnectionTool.GetConnectionString();
        ///   string masterQuery = "select * from Presidents";
        ///   string detailQuery = "SELECT EventId, DateStarted, DateEnded, ShortDescription, Description, EventType, PresidentId FROM Event";
        /// </summary>
        /// <param name="masterQuery"></param>
        /// <param name="detailQuery"></param>
        /// <param name="connectionString"></param>
        /// <param name="connectingId"></param>
        /// <param name="masterTableName"></param>
        /// <param name="detailTableName"></param>
        /// <param name="relationName"></param>
        public void GetData(string masterQuery, string detailQuery, string connectionString, string connectingId,
            string masterTableName, string detailTableName, string relationName)
        {
 
            this.detailTable = detailTableName;

            try
            {
                SqlConnection connection = new SqlConnection(connectionString);

                // Create a DataSet.
                masterDetailDataSet = new DataSet();
                masterDetailDataSet.Locale = System.Globalization.CultureInfo.InvariantCulture;
                
                // Add data from the master table to the DataSet.
                dataAdapterPresidents = new SqlDataAdapter(masterQuery, connection);
                dataAdapterPresidents.Fill(masterDetailDataSet, masterTableName);

                // Add data from the detail table to the DataSet.
                detailsDataAdapter = new SqlDataAdapter(detailQuery, connection);
                detailsDataAdapter.Fill(masterDetailDataSet, detailTableName);

                SetUpSqlCommands(connection);                
            
                // Set up the relationship between the two tables.
                DataRelation relation = new DataRelation(relationName,
                    masterDetailDataSet.Tables[masterTableName].Columns[connectingId],
                    masterDetailDataSet.Tables[detailTableName].Columns[connectingId]);
                masterDetailDataSet.Relations.Add(relation);

                // Set up a binding source to the master table.
                bindingSourceMaster.DataSource = masterDetailDataSet;
                bindingSourceMaster.DataMember = masterTableName;

                // Set up binding source for the detail table
                bindingSourceDetail.DataSource = bindingSourceMaster;
                bindingSourceDetail.DataMember = relationName;
            }
            catch (SqlException)
            {
                MessageBox.Show("There was an error. Check your connection string and queries.");
            }
        }

        public abstract void SetUpSqlCommands(SqlConnection connection);        
    }
}
```
